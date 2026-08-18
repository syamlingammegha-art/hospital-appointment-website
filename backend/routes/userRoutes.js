import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/patients", async (req,res)=>{
  const [rows]=await pool.query(
    "SELECT id,full_name,email,phone,age,gender FROM users WHERE role='patient'"
  );
  res.json(rows);
});

router.get("/doctors", async (req,res)=>{
  const [rows]=await pool.query(
    "SELECT id,full_name,email,phone FROM users WHERE role='doctor'"
  );
  res.json(rows);
});

export default router;