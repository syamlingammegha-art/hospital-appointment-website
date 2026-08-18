import express from "express";
import {
  createOP,
  getTodayQueue,
  getAllOPs,
  updateStatus,
} from "../controllers/opController.js";

const router = express.Router();

// Create OP
router.post("/", createOP);

// Get all OP records
router.get("/", getAllOPs);

// Get today's queue
router.get("/today", getTodayQueue);

// Update status
router.put("/:id/status", updateStatus);

export default router;