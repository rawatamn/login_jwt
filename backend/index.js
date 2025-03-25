import "dotenv/config"; 
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 
import movieRoutes from "./routes/moviesRoutes.js"; 
import cartRoutes from "./routes/cartroutes.js";
import createSuperadmin from "./utilities/createSuperadmin.js";
import { API } from "./utilities/apiRoutes.js";
const app = express();

// ✅ Correct CORS Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://login-jwt-3xz9.vercel.app"], 
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));


// ✅ JSON Middleware
app.use(express.json());

// ✅ Routes
app.use(API.AUTH, authRoutes);
app.use(API.USER, userRoutes);
app.use(API.MOVIE, movieRoutes);
app.use(API.CART, cartRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Connect to Database
connectDB().then(() => {
  createSuperadmin(); // ✅ Call Superadmin Creation
  console.log("🚀 Database Connected!");
});

// ✅ Export Express App for Vercel
export default app;
