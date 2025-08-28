const express = require("express");
const { purchaseSubscription, getSubscriptionBalance } = require("../controllers/subscriptionController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseSubscription); // Add balance
router.get("/balance", protect, getSubscriptionBalance); // Check balance

module.exports = router;
