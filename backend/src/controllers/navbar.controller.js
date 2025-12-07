const Navbar = require("./models/navbar.model");

exports.getNavbar = async (req, res) => {
  try {
    let data = await Navbar.findOne();

    if (!data) {
      data = await Navbar.create({
        logo: "",
        links: [
          { name: "HOME", path: "/" },
          { name: "ABOUT", path: "/about" },
          { name: "PACKAGE", path: "/packages" },
          { name: "SERVICES", path: "/services" },
          { name: "GALLERY", path: "/gallery" },
          { name: "CONTACT", path: "/contact" }
        ]
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNavbar = async (req, res) => {
  try {
    const { links } = req.body;

    const updated = await Navbar.findOneAndUpdate(
      {},
      { links },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const updated = await Navbar.findOneAndUpdate(
      {},
      { logo: req.file.filename },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
