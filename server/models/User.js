import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Clerk userId stored as MongoDB _id
    _id: { type: String, required: true }, // Clerk userId

    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    image: { type: String, required: true },

    // Optional fields (can update later)
    phone: { type: String, default: "" },

    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "India" },
      pincode: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;