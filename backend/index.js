import "dotenv/config"; // ✅ Loads .env variables
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // ✅ Add `.js` extension
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 
import movieRoutes from "./routes/moviesRoutes.js"; 
import cartroutes from "./routes/cartroutes.js"
import createSuperadmin from "./utilities/createSuperadmin.js";
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
app.use("/api/cart", cartroutes);

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
