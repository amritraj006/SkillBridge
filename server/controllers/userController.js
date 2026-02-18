import User from "../models/User.js";
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

    const user = await User.findById(userId).populate("cartCourses.course");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      cartCourses: user.cartCourses.map((item) => ({
        _id: item.course?._id,
        title: item.course?.title,
        thumbnailUrl: item.course?.thumbnailUrl,
        price: item.course?.price,
      })),
    });
  } catch (error) {
    console.log("getCart error:", error);
    res.status(500).json({ message: "Server error" });
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