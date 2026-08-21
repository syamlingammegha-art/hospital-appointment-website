import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMedicalRecords } from "../controllers/patientController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/medical-records", getMedicalRecords);

export default router;