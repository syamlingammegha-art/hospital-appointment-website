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
export const getPatientHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT mr.*, d.name AS doctor_name, d.specialization
       FROM medical_records mr
       LEFT JOIN doctors d ON mr.doctor_id = d.id
       WHERE mr.patient_id = ?
       ORDER BY mr.created_at DESC`,
      [id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};