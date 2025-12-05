const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// ✅ Correct path to AdminUser.js
const AdminUser = require('./src/models/AdminUser');

// ✅ Import DB Connection
const connectDB = require('./src/config/db');

connectDB();

(async () => {
    try {
        console.log("Seeding Admin...");

        await AdminUser.deleteMany({});
        await AdminUser.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin123"
        });

        console.log("Admin User Created Successfully!");
        process.exit();
    } catch (error) {
        console.error("Seed Error:", error);
        process.exit(1);
    }
})();
