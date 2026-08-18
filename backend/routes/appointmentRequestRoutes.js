import express from "express";
import {
  createAppointmentRequest,
  getPatientRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
} from "../controllers/appointmentRequestController.js";

const router = express.Router();

// Patient
router.post("/", createAppointmentRequest);
router.get("/patient/:patientId", getPatientRequests);

// Staff
router.get("/", getAllRequests);
router.put("/:id/approve", approveRequest);
router.put("/:id/reject", rejectRequest);

export default router;