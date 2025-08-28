const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
