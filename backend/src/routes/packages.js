// backend/routes/packages.js
const express = require("express");
const router = express.Router();
const Package = require("../models/Package");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// multer storage: save in backend/uploads/
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

// GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json({ packages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE package (image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, items, priceText } = req.body;
    const itemsArray = typeof items === "string" ? JSON.parse(items) : items || [];

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const pkg = new Package({
      title,
      items: itemsArray,
      image: imagePath,
      priceText,
    });

    await pkg.save();
    res.json({ message: "Package created", pkg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE package (optional image replace)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, items, priceText } = req.body;
    const itemsArray = typeof items === "string" ? JSON.parse(items) : items || [];

    const pkg = await Package.findById(id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });

    // if new image uploaded, delete old file (optional)
    if (req.file) {
      // remove old file if exists and is in /uploads
      try {
        if (pkg.image && pkg.image.startsWith("/uploads/")) {
          const oldPath = path.join(__dirname, "..", pkg.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      } catch (e) {
        console.warn("Could not delete old image", e);
      }
      pkg.image = `/uploads/${req.file.filename}`;
    }

    pkg.title = title ?? pkg.title;
    pkg.items = itemsArray;
    pkg.priceText = priceText ?? pkg.priceText;

    await pkg.save();
    res.json({ message: "Package updated", pkg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE package
router.delete("/:id", async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Not found" });

    // delete image file if exists
    try {
      if (pkg.image && pkg.image.startsWith("/uploads/")) {
        const p = path.join(__dirname, "..", pkg.image);
        if (fs.existsSync(p)) fs.unlinkSync(p);
      }
    } catch (e) {
      console.warn("Could not delete image file", e);
    }

    res.json({ message: "Package deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
