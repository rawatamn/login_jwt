import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const createSuperadmin = async () => {
  try {
    console.log("🔹 Checking for existing Superadmin...");

    const superadminExists = await User.findOne({ role: "superadmin" });

    if (!superadminExists) {
      const hashedPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10);

      const superadmin = new User({
        username: process.env.SUPERADMIN_USERNAME,
        useremail: process.env.SUPERADMIN_EMAIL,
        password: hashedPassword,
        role: "superadmin",
      });

      await superadmin.save();
      console.log("✅ Superadmin created successfully");
    } else {
      console.log("✅ Superadmin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating superadmin:", error);
  }
};

export default createSuperadmin;
