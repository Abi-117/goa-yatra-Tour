// backend/controllers/homepage.controller.js
const Homepage = require("../models/homepage.model");

exports.getHomepage = async (req, res) => {
  try {
    const data = await Homepage.findOne();
    res.json(data || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateHomepage = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();
    if (!homepage) homepage = new Homepage();

    homepage.heroTitle = req.body.heroTitle;
    homepage.heroSubtitle = req.body.heroSubtitle;
    homepage.ctaTitle = req.body.ctaTitle;
    homepage.ctaSubtitle = req.body.ctaSubtitle;

    if (req.body.offers) {
      homepage.offers = JSON.parse(req.body.offers);
    }

    // Save only filename (no leading /uploads/)
    if (req.files && req.files.heroImage) {
      homepage.heroImage = req.files.heroImage[0].filename;
    }
    if (req.files && req.files.ctaImage) {
      homepage.ctaImage = req.files.ctaImage[0].filename;
    }

    await homepage.save();
    res.json({ success: true, data: homepage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
