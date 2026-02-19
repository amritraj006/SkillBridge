import User from "../models/User.js";
import {Course} from "../models/Course.js"
import { sendEmail } from "../utils/sendEmail.js";
import mongoose from "mongoose";


export const userDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({created: -1});
    if (users.length === 0) return res.status(404).json({ message: "No users found." })
    return res.json(users);
  }catch(error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({message: "Server Error"});
  }
}

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: "cartCourses.course",
      select: "title price thumbnailUrl duration", // ✅ only needed fields
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Build cart list safely
    const cartItems = user.cartCourses
      .filter((item) => item.course) // important
      .map((item) => ({
        _id: item.course._id,
        title: item.course.title,
        price: item.course.price,
        thumbnailUrl: item.course.thumbnailUrl,
        duration: item.course.duration,
        addedAt: item.addedAt,
      }));

    return res.json(cartItems);
  } catch (error) {
    console.log("getCart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const toggleCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyInCart = user.cartCourses.some(
      (item) => item.course.toString() === courseId
    );

    if (alreadyInCart) {
      // remove
      user.cartCourses = user.cartCourses.filter(
        (item) => item.course.toString() !== courseId
      );

      await user.save();

      return res.json({
        message: "Removed from cart",
        inCart: false,
        cartCourses: user.cartCourses,
      });
    } else {
      // add
      user.cartCourses.push({ course: courseId });

      await user.save();

      return res.json({
        message: "Added to cart",
        inCart: true,
        cartCourses: user.cartCourses,
      });
    }
  } catch (error) {
    console.log("toggleCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const { clerkId } = req.body;

    if (!clerkId) {
      return res.status(400).json({ message: "clerkId is required" });
    }

    // ✅ Find user (cart populated)
    const user = await User.findById(clerkId).populate({
      path: "cartCourses.course",
      select: "title price thumbnailUrl duration availableSlots totalSlots",
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cartCourses || user.cartCourses.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Store cart courses before clearing
    const cartCourses = user.cartCourses
      .map((item) => item.course)
      .filter(Boolean);

    const cartCourseIds = cartCourses.map((c) => c._id);

    // ✅ existing purchased set
    const purchasedSet = new Set(
      (user.purchasedCourses || []).map((id) => id.toString())
    );

    // ✅ only new courses (not already purchased)
    const newlyPurchasedCourses = cartCourses.filter(
      (c) => !purchasedSet.has(c._id.toString())
    );

    if (newlyPurchasedCourses.length === 0) {
      // still clear cart (optional)
      user.cartCourses = [];
      await user.save();

      return res.status(200).json({
        message: "Cart cleared. No new courses were purchased (already owned).",
        purchasedCount: 0,
        totalAmount: 0,
      });
    }

    // ✅ check slots before purchase
    const noSlotsCourses = newlyPurchasedCourses.filter(
      (c) => (c.availableSlots ?? 0) <= 0
    );

    if (noSlotsCourses.length > 0) {
      return res.status(400).json({
        message: "Some courses have no available slots",
        courses: noSlotsCourses.map((c) => ({
          id: c._id,
          title: c.title,
          availableSlots: c.availableSlots,
        })),
      });
    }

    // ✅ total amount for NEW purchases only
    const totalAmount = newlyPurchasedCourses.reduce(
      (sum, c) => sum + (c.price || 0),
      0
    );

    // ✅ Push newly purchased into user.purchasedCourses
    newlyPurchasedCourses.forEach((c) => {
      user.purchasedCourses.push(c._id);
    });

    // ✅ Clear cart
    user.cartCourses = [];
    await user.save();

    // ✅ Update each course stats
    for (const course of newlyPurchasedCourses) {
      await Course.findByIdAndUpdate(course._id, {
        $inc: {
          totalEnrolled: 1,
          totalRevenue: course.price || 0,
          availableSlots: -1, // ✅ slots -1
        },
        $push: {
          enrolledStudents: {
            studentId: user._id,
            studentEmail: user.email,
            enrolledAt: new Date(),
          },
        },
      });
    }

    // ✅ Email HTML (only newly purchased)
    const purchasedHTML = newlyPurchasedCourses
      .map(
        (c) => `
        <li style="margin-bottom: 8px;">
          <b>${c.title}</b> — ₹${c.price || 0}
        </li>
      `
      )
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>✅ Payment Successful</h2>
        <p>Hello <b>${user.name}</b>,</p>

        <p>Your payment was successful. You purchased:</p>

        <ul>
          ${purchasedHTML}
        </ul>

        <p><b>Total Amount:</b> ₹${totalAmount}</p>
        <p><b>Date:</b> ${new Date().toLocaleString()}</p>

        <hr />
        <p style="color: gray; font-size: 13px;">
          Thank you for using SkillBridge LMS.
        </p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: "SkillBridge LMS - Payment Successful",
      html,
    });

    return res.status(200).json({
      message:
        "Payment success. Cart cleared, purchasedCourses updated, slots reduced.",
      totalAmount,
      purchasedCount: newlyPurchasedCourses.length,
    });
  } catch (error) {
    console.log("paymentSuccess error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getPurchasedCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("purchasedCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.purchasedCourses); // returns array of course ObjectIds
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ message: "Server error" });
  }
  
};
