import pool from "../config/db.js";

// ==========================================
// CREATE OP
// ==========================================
export const createOP = async (req, res) => {
  try {
    const {
      patient_name,
      phone,
      age,
      gender,
      doctor_id,
      chief_complaint,
      symptoms,
      priority,
      appointment_date,
      appointment_time,
    } = req.body;

    // Validate required fields
    if (
      !patient_name ||
      !phone ||
      !age ||
      !gender ||
      !doctor_id ||
      !chief_complaint ||
      !symptoms ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check doctor exists
    const [doctor] = await pool.query(
      `SELECT id, name, specialization
       FROM doctors
       WHERE id = ?`,
      [doctor_id]
    );

    if (!doctor.length) {
      return res.status(404).json({
        message: "Selected doctor not found",
      });
    }

    // Generate OP Number
    const opNumber = `OP-${Date.now()}`;

    // Insert OP
    await pool.query(
      `INSERT INTO outpatient_records
      (
        op_number,
        patient_name,
        phone,
        age,
        gender,
        doctor_id,
        chief_complaint,
        symptoms,
        priority,
        appointment_date,
        appointment_time,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        opNumber,
        patient_name,
        phone,
        age,
        gender,
        doctor_id,
        chief_complaint,
        symptoms,
        priority || "Normal",
        appointment_date,
        appointment_time,
        "Pending",
      ]
    );

    res.status(201).json({
      message: "OP registered successfully",
      op_number: opNumber,
      doctor_id: doctor_id,
      doctor_name: doctor[0].name,
    });
  } catch (err) {
    console.error("CREATE OP ERROR:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================================
// GET TODAY'S QUEUE
// ==========================================
export const getTodayQueue = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT *
       FROM outpatient_records
       WHERE appointment_date = CURDATE()
       ORDER BY appointment_time ASC`
    );

    res.json(rows);
  } catch (err) {
    console.error("GET TODAY QUEUE ERROR:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================================
// UPDATE OP STATUS
// ==========================================
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Consultation",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
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
    console.error("UPDATE STATUS ERROR:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================================
// GET ALL OP RECORDS
// ==========================================
export const getAllOPs = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        o.id,
        o.op_number,
        o.patient_name,
        o.phone,
        o.age,
        o.gender,
        o.doctor_id,
        d.name AS doctor_name,
        d.specialization,
        o.chief_complaint,
        o.symptoms,
        o.priority,
        o.appointment_date,
        o.appointment_time,
        o.status,
        o.created_at
      FROM outpatient_records o
      LEFT JOIN doctors d
        ON o.doctor_id = d.id
      ORDER BY
        o.appointment_date ASC,
        o.appointment_time ASC
    `);

    res.json(rows);
  } catch (error) {
    console.error("GET OP ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch OP records",
    });
  }
};