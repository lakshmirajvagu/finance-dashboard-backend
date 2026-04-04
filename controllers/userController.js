const User = require("../models/User");


// 🔹 GET ALL USERS (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      count: users.length,
      data: users
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 TOGGLE USER STATUS (Admin only)
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // toggle status
    user.isActive = !user.isActive;

    await user.save();

    res.json({
      message: `User is now ${user.isActive ? "active" : "inactive"}`,
      data: user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};