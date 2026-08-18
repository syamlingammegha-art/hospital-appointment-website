import express from "express";
import { getPatients } from "../controllers/staffController.js";

const router = express.Router();

router.get("/patients", getPatients);

export default router;