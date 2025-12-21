import User from "../models/User.model.js";

/**
 * @desc    Get all registered users
 * @route   GET /api/admin/users
 * @access  Admin only
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * @desc    Get single user by ID
 * @route   GET /api/admin/users/:id
 * @access  Admin only
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid user ID" });
  }
};

/**
 * @desc    Block or unblock user
 * @route   PATCH /api/admin/users/:id/status
 * @access  Admin only
 */
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${user.isActive ? "unblocked" : "blocked"} successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/**
 * @desc    Delete user permanently
 * @route   DELETE /api/admin/users/:id
 * @access  Admin only
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

/**
 * @desc    Admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Admin only
 */
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const admins = await User.countDocuments({ role: "admin" });

    const recentUsers = await User.find({}, "-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalUsers,
      activeUsers,
      admins,
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
