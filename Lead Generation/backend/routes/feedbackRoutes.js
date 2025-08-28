const express = require("express");
const { submitFeedback, getAllFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/submit", submitFeedback); // ✅ Submit feedback
router.get("/all", getAllFeedback); // ✅ Get all feedback (Everyone can view)

module.exports = router;
