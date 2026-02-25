import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {

    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    age: {type: Number, required: true},

    course: {type: String, required: true},

    password: {type: String, required: true}

  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);