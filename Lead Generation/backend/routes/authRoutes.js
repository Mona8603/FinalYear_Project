const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerVendor, loginVendor, getVendorProfile } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Set up Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ Vendor Registration with Image Upload
router.post("/register", upload.single("profilePic"), registerVendor);
router.post("/login", loginVendor);

// ✅ Get Logged-In Vendor's Profile
router.get("/vendor-profile", protect, getVendorProfile);

module.exports = router;
