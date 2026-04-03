const express = require("express");
const {
  createRecord,
  getAllRecords,
  getFilteredRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create (Admin only)
router.post("/", authMiddleware, roleMiddleware("admin"), createRecord);

// ✅ Get all (Viewer + Analyst + Admin)
router.get("/", authMiddleware, getAllRecords);

// ✅ Filter (ONLY Analyst + Admin)
router.get(
  "/filter",
  authMiddleware,
  roleMiddleware("admin", "analyst"),
  getFilteredRecords
);

// Update (Admin only)
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateRecord);

// Delete (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteRecord);

module.exports = router;