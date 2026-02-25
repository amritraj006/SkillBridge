import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Student } from "../models/Student.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, age, course, password } = req.body;

    if (!name || !email || !age || !course || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      age,
      course,
      password: hashedPassword
    });

    res.status(201).json({ message: "Registered successfully", student });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & Password required" });

    const student = await Student.findOne({ email });
    if (!student)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/students", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({ age: { $gt: 21 } }).select("-password");

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.put("/students/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updated)
      return res.status(404).json({ message: "Student not found" });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= DELETE STUDENT =================
router.delete("/students/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



export default router;