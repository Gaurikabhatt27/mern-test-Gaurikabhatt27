import express from "express";
import { register, login, loginAdmin } from "../controllers/authController.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", loginAdmin);

export default router;