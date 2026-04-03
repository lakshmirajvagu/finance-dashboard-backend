const express = require("express");
const {
  getSummary,
  getCategorySummary,
  getMonthlySummary
} = require("../controllers/summaryController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Analyst + Admin only
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "analyst"),
  getSummary
);

router.get(
  "/category",
  authMiddleware,
  roleMiddleware("admin", "analyst"),
  getCategorySummary
);

router.get(
  "/monthly",
  authMiddleware,
  roleMiddleware("admin", "analyst"),
  getMonthlySummary
);

module.exports = router;