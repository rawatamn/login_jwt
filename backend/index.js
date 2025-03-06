require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/user"); 
const bcrypt = require("bcryptjs");
const app = express();
connectDB().then(()=>{
  createSuperadmin()
})


// ✅ Correct CORS Configuration
// app.use(cors({
//   origin: ["http://localhost:3000"], // Allow requests from frontend
//   methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Fixed methods array
//   credentials: true,
// }));

// ✅ JSON Middleware
app.use(express.json());
app.use(cors())
// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
//creating super admin
async function createSuperadmin() {
  try {
    const superadminstate = await User.findOne({ role: "superadmin" });

    if (!superadminstate) {
      const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10);

      const superadmin = new User({
        username: "Aman",
        useremail: "rawat1234.com", // ✅ Fix: Use 'useremail' instead of 'email'
        password: hashedPassword,
        role: "superadmin"
      });

      await superadmin.save();
      console.log("Superadmin created successfully");
    } else {
      console.log("Superadmin already exists");
    }
  } catch (error) {
    console.error("Error creating superadmin:", error);
  }
}


// ✅ Correct Port (Ensure it Matches Your Frontend Requests)
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
