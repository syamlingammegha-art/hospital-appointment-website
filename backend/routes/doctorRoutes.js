import express from "express";
import multer from "multer";

import {
  addDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/doctors",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", upload.single("photo"), addDoctor);
router.delete("/:id", deleteDoctor);

export default router;