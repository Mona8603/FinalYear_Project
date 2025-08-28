const Inquiry = require("../models/Inquiry");
const Vendor = require("../models/Vendor");

const INQUIRY_COST = 10; // ₹10 per inquiry

// ✅ Submit Inquiry (User)
const createInquiry = async (req, res) => {
    try {
        const { name, phone, vendorType, message } = req.body;
        if (!name || !phone || !vendorType || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const inquiry = await Inquiry.create({ name, phone, vendorType, message });

        res.status(201).json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ Get Vendor Inquiries (Deduct Balance ONLY for NEW Inquiries)
const getVendorInquiries = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.vendor.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // ✅ Get total inquiries for this vendor type
        const totalInquiries = await Inquiry.countDocuments({ vendorType: vendor.role });

        // ✅ Get last known inquiry count from vendor
        const lastKnownInquiryCount = vendor.lastKnownInquiryCount || 0;

        // ✅ Count only NEW inquiries since last check
        const newInquiriesCount = totalInquiries - lastKnownInquiryCount;

        let deductionAmount = 0;

        // ✅ Deduct balance ONLY for new inquiries
        if (newInquiriesCount > 0) {
            deductionAmount = newInquiriesCount * INQUIRY_COST;

            // ✅ Deduct balance if vendor has enough funds
            if (vendor.subscriptionBalance >= deductionAmount) {
                vendor.subscriptionBalance -= deductionAmount;
                vendor.lastKnownInquiryCount = totalInquiries; // ✅ Update last known inquiry count
                await vendor.save();
            } else {
                return res.status(403).json({ message: "Insufficient subscription balance. Please recharge." });
            }
        }

        // ✅ Fetch inquiries
        const inquiries = await Inquiry.find({ vendorType: vendor.role }).sort({ createdAt: -1 });

        res.json({
            inquiries,
            remainingBalance: vendor.subscriptionBalance,
            message: newInquiriesCount > 0 
                ? `${newInquiriesCount} new inquiries received. ₹${deductionAmount} deducted.` 
                : "No new inquiries received."
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createInquiry, getVendorInquiries };
