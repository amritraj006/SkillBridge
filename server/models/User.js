import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Clerk userId stored as MongoDB _id
    _id: { type: String, required: true }, // Clerk userId

    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    image: { type: String, required: true },

    // Optional fields
    phone: { type: String, default: "" },

    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "India" },
      pincode: { type: String, default: "" },
    },

    // Courses purchased by the user
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Course _id
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;