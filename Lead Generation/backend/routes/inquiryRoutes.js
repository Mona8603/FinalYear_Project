const express = require("express");
const { createInquiry, getVendorInquiries } = require("../controllers/inquiryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit-inquiry", createInquiry); // Users submit inquiries
router.get("/vendor-inquiries", protect, getVendorInquiries); // Vendors retrieve inquiries

module.exports = router;
