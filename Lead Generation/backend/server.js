const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Increase Request Payload Limit for File Uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Enable CORS Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

// ✅ Serve Uploaded Images
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/subscription", require("./routes/subscriptionRoutes"));

app.use("/api/feedback", require("./routes/feedbackRoutes")); // ✅ New feedback route

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is Running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
