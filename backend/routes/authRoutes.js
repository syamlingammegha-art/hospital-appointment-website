import express from "express";
import {
  register,
  login,
  googleLogin,
  createStaffUser,
} from "../controllers/authController.js";

const router = express.Router();

// Patient routes
router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

// Admin creates staff/doctor/admin accounts
router.post("/staff/create", createStaffUser);

export default router;