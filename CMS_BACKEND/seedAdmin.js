import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = "mongodb+srv://gaurikabhatt27:*Gautam019@cluster0.mniol91.mongodb.net/Student_CMS?appName=Cluster0";

// Define schema directly so we don't have to rely on the app models right now
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: "admin@test.com" });
        if (existingAdmin) {
            console.log("Admin already exists! You can log in with: admin@test.com / admin123");
            process.exit(0);
        }

        // Create new admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        await Admin.create({
            email: "admin@test.com",
            password: hashedPassword
        });

        console.log("Successfully created test admin user!");
        console.log("Login Details:");
        console.log("Email: admin@test.com");
        console.log("Password: admin123");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
