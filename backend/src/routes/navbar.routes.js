const express = require("express");
const { getNavbar, updateNavbar } = require("../controllers/navbar.controller");
const router = express.Router();

router.get("/", getNavbar);
router.put("/", updateNavbar);

module.exports = router;
