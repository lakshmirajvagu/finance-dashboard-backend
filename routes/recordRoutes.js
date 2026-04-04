const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validateMiddleware.js");


const {
  createRecord,
  getAllRecords,
  getFilteredRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");
const { searchRecords, restoreRecord } = require("../controllers/recordController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  [
    body("amount")
      .isFloat({ min: 0 })
      .withMessage("Amount must be a positive number"),

    body("type")
      .isIn(["income", "expense"])
      .withMessage("Invalid type"),

    body("category")
      .notEmpty()
      .withMessage("Category is required"),
  ],
  validate,
  createRecord
);

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
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  [
    body("amount").optional().isFloat({ min: 0 }),
  ],
  validate,
  updateRecord
);

// SEARCH (Admin + Analyst)
router.get(
  "/search",
  authMiddleware,
  roleMiddleware("viewer","admin", "analyst"),
  searchRecords
);

// RESTORE (Admin only)
router.put(
  "/restore/:id",
  authMiddleware,
  roleMiddleware("admin"),
  restoreRecord
);

// Delete (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteRecord);

module.exports = router;