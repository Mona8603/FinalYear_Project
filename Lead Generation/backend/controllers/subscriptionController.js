const Vendor = require("../models/Vendor");

// ✅ Purchase Subscription (Allowed only when Balance is ₹0)
const purchaseSubscription = async (req, res) => {
    try {
        const { amount } = req.body;
        const vendorId = req.vendor.id;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid subscription amount" });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // ✅ Prevent purchase if balance is NOT 0
        if (vendor.subscriptionBalance > 0) {
            return res.status(403).json({ message: "You can only purchase a subscription when your balance is ₹0." });
        }

        vendor.subscriptionBalance += amount; // Add balance
        await vendor.save();

        res.status(200).json({ message: "Subscription added successfully", newBalance: vendor.subscriptionBalance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Subscription Balance
const getSubscriptionBalance = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.vendor.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.json({ remainingBalance: vendor.subscriptionBalance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { purchaseSubscription, getSubscriptionBalance };
