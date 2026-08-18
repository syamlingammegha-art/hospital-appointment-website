import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getDoctorQueue,
  getPatient,
  saveConsultation,
} from "../controllers/doctorPortalController.js";

const router = express.Router();

// Authentication
router.use(authMiddleware);

// Doctor role only
router.use(roleMiddleware("doctor"));

// Doctor queue
router.get("/queue", getDoctorQueue);

// Single patient
router.get("/patient/:id", getPatient);

// Consultation
router.post("/consult/:id", saveConsultation);

export default router;