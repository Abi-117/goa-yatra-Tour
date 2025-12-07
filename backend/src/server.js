import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import servicesRoute from "./routes/services.js";

import authRoutes from "./routes/auth.js";
import adminPages from "./routes/adminPages.js";
import homepageRoutes from "./routes/homepage.routes.js";
import footerRoutes from "./routes/footer.routes.js";
import navbarRoutes from "./routes/navbar.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import packagesRoutes from "./routes/packages.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// correct path
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pages", adminPages);
app.use("/api/homepage", homepageRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", servicesRoute);
app.use("/api/gallery", galleryRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
cd