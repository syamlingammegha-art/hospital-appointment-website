import pool from "../config/db.js";

export const getPatients = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, full_name, email, phone, age, gender
      FROM users
      WHERE role = 'patient'
      ORDER BY full_name ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("GET PATIENTS ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};