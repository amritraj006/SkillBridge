import User from "../models/User.js";

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