import express from "express";
import { register, login } from "../controllers/authController.js"; // ✅ Use `import`

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router; // ✅ Use `export default`
