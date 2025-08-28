const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ✅ Vendor Registration with Image Upload
const registerVendor = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !phone || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists." });
    }

    const profilePic = req.file ? `/uploads/${req.file.filename}` : ""; // ✅ Store Image URL

    const vendor = await Vendor.create({
      name,
      phone,
      email,
      password,
      role,
      profilePic
    });

    res.status(201).json({ message: "Vendor Registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Vendor Login - Return Profile Picture
const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: vendor._id, role: vendor.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      role: vendor.role,
      remainingBalance: vendor.subscriptionBalance,
      profilePic: vendor.profilePic // ✅ Send profile picture URL
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ Get Logged-In Vendor's Profile
const getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id).select("-password"); // Exclude password field

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerVendor, loginVendor, getVendorProfile };
