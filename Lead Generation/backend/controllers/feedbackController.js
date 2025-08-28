const Feedback = require("../models/Feedback");

// ✅ Submit Feedback (Anyone can submit)
const submitFeedback = async (req, res) => {
    try {
        const { clientName, stars, description } = req.body;

        if (!clientName || !stars || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (stars < 1 || stars > 5) {
            return res.status(400).json({ message: "Stars must be between 1 and 5." });
        }

        const feedback = await Feedback.create({ clientName, stars, description });

        res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get All Feedback (Anyone can view)
const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitFeedback, getAllFeedback };
