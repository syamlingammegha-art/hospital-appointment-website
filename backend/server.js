import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import opRoutes from "./routes/opRoutes.js";
import appointmentRequestRoutes from "./routes/appointmentRequestRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import doctorPortalRoutes from "./routes/doctorPortalRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/op", opRoutes);
app.use("/api/appointment-requests", appointmentRequestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/doctor", doctorPortalRoutes);
app.use("/api/patient", patientRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Hospital Appointment Backend Running",
  });
});

const PORT = process.env.PORT || 5000;
console.log("Doctor Portal Routes Loaded");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});