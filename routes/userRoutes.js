const express = require("express");
const {
  getAllUsers,
  toggleUserStatus
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// GET all users (Admin only)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

// Toggle active/inactive (Admin only)
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  toggleUserStatus
);

module.exports = router;