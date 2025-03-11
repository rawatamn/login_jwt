require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/moviesRoutes");
const User = require("./models/user"); 
const bcrypt = require("bcryptjs");

const app = express();

// ✅ Enable CORS before routes
app.use(cors({
  origin: "http://localhost:5173",  
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// ✅ JSON Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes); // ✅ Keep routes after CORS

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Creating Superadmin
async function createSuperadmin() {
  try {
    const superadminstate = await User.findOne({ role: "superadmin" });

    if (!superadminstate) {
      const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10);

      const superadmin = new User({
        username: "Aman",
        useremail: "rawat1234@gmail.com", // ✅ Valid email format
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

// ✅ Connect DB & Start Server
connectDB().then(() => {
  createSuperadmin();

  const PORT = process.env.PORT || 7000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
