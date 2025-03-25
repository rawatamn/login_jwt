import express from "express";
import { register, login } from "../controllers/authController.js"; // ✅ Use `import`
import { API } from "../utilities/apiRoutes.js";

const router = express.Router();

router.post(API.REGISTER, register);
router.post(API.LOGIN, login);

export default router; // ✅ Use `export default`
