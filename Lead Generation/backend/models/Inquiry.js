const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vendorType: { type: String, enum: ["Painter", "Plumber", "Electrician", "Carpenter", "Mechanic"], required: true },
    message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", InquirySchema);
