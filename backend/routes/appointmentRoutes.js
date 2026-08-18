import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  cancelAppointment,
} from "../controllers/appointmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Patient books an appointment
router.post(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  bookAppointment
);

// Patient views their own appointments
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("patient"),
  getMyAppointments
);

// Doctor views appointments assigned to them
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorAppointments
);

// Patient cancels their appointment
router.put(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware("patient"),
  cancelAppointment
);

export default router;