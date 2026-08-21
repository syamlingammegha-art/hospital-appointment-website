import pool from "../config/db.js";

export const getMedicalRecords = async (req, res) => {
  try {
    console.log("Logged-in User:", req.user); // Put it here

    const userId = req.user.id;

    const [userRows] = await pool.query(
      "SELECT id FROM users WHERE id = ?",
      [userId]
    );

    if (!userRows.length) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientId = userRows[0].id;

    const [rows] = await pool.query(
      `SELECT
          mr.*,
          op.op_number,
          op.patient_name,
          op.age,
          op.gender,
          d.name AS doctor_name,
          d.specialization,
          d.photo
       FROM medical_records mr
       LEFT JOIN outpatient_records op ON mr.op_id = op.id
       LEFT JOIN doctors d ON mr.doctor_id = d.id
       WHERE mr.patient_id = ?
       ORDER BY mr.created_at DESC`,
      [patientId]
    );

    console.log("Medical Records:", rows);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};