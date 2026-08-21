import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPatients,
  getPatientHistory,
} from "../controllers/staffController.js";

const router = express.Router();

router.get("/patients", authMiddleware, getPatients);

router.get("/patient-history/:id", authMiddleware, getPatientHistory);

export default router;