const mongoose = require("mongoose");

const NavbarSchema = new mongoose.Schema({
  logo: String,
  menuItems: [
    {
      name: String,
      link: String
    }
  ]
});

module.exports = mongoose.model("Navbar", NavbarSchema);
