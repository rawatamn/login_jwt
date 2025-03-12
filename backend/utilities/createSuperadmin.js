require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const createSuperadmin = async () => {
  try {
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
      console.log("✅ Superadmin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating superadmin:", error);
  }
};

module.exports = createSuperadmin;
