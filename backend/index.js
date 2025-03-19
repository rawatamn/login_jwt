require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/moviesRoutes");
const createSuperadmin = require("./utilities/createSuperadmin"); // ✅ Import Superadmin Creator


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
app.use("/api/cart", require("./routes/cartroutes"));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Connect DB & Start Server
connectDB().then(() => {
  createSuperadmin(); // ✅ Call Superadmin Creation

  const PORT = process.env.PORT || 7000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
