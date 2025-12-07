// backend/models/Package.js
const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: { type: [String], default: [] },
  image: { type: String, default: "" }, // will store URL/path like /uploads/filename.jpg
  priceText: { type: String }, // optional field for quick display
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Package", PackageSchema);
