import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  getDoctorQueue,
  getPatient,
  updateDoctorStatus,
  saveConsultation,
} from "../controllers/doctorPortalController.js";

const router = express.Router();

// Doctor authentication
router.use(authMiddleware);
router.use(roleMiddleware("doctor"));

// Doctor Dashboard
router.get("/queue", getDoctorQueue);

// Patient Details
router.get("/patient/:id", getPatient);

// Update Patient Status
router.put("/status/:id", updateDoctorStatus);

// Save Consultation
router.post("/consult/:id", saveConsultation);

export default router;