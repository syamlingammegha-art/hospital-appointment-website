import pool from "../config/db.js";

// ===============================
// Get Doctor's Today's Queue
// ===============================
export const getDoctorQueue = async (req, res) => {
  try {
    console.log("JWT:", req.user);

    const userId = req.user.id;

    const [userRows] = await pool.query(
      "SELECT id, email, role FROM users WHERE id=?",
      [userId]
    );

    console.log("USER ROW:", userRows);

    const [doctorRows] = await pool.query(
      "SELECT id, name, email FROM doctors WHERE email=?",
      [userRows[0]?.email]
    );

    console.log("DOCTOR ROW:", doctorRows);

    if (!doctorRows.length) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    const [queue] = await pool.query(
      `SELECT *
       FROM outpatient_records
       WHERE doctor_id=?
       ORDER BY appointment_date, appointment_time`,
      [doctorRows[0].id]
    );

    console.log("QUEUE:", queue);

    res.json(queue);
  } catch (err) {
    console.error("QUEUE ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
    
  
// ===============================
// Get Single Patient
// ===============================
export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM outpatient_records WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("GET PATIENT ERROR:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Update OP Status
// ===============================
export const updateDoctorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = [
      "Pending",
      "In Consultation",
      "Completed",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    await pool.query(
      `UPDATE outpatient_records
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    res.json({
      message: "Status updated successfully",
    });
  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Complete Consultation
// ===============================
export const saveConsultation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const {
      diagnosis,
      prescription,
      notes,
      next_visit,
    } = req.body;

    // Get doctor email
    const [userRows] = await pool.query(
      "SELECT email FROM users WHERE id = ?",
      [userId]
    );

    const [doctorRows] = await pool.query(
      "SELECT id FROM doctors WHERE email = ?",
      [userRows[0].email]
    );

    const doctorId = doctorRows[0].id;

    // Get OP
    const [opRows] = await pool.query(
      "SELECT * FROM outpatient_records WHERE id = ?",
      [id]
    );

    if (opRows.length === 0) {
      return res.status(404).json({
        message: "OP record not found",
      });
    }

    const op = opRows[0];

    // Save medical record
    await pool.query(
      `INSERT INTO medical_records
      (
        op_id,
        patient_id,
        doctor_id,
        diagnosis,
        prescription,
        notes,
        next_visit
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        op.id,
        op.patient_id,
        doctorId,
        diagnosis,
        prescription,
        notes,
        next_visit,
      ]
    );

    // Mark OP completed
    await pool.query(
      `UPDATE outpatient_records
       SET status='Completed'
       WHERE id=?`,
      [id]
    );

    res.json({
      message: "Consultation completed successfully",
    });
  } catch (err) {
    console.error("CONSULTATION ERROR:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};