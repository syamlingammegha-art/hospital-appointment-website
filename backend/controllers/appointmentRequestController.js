import pool from "../config/db.js";

// Patient creates appointment request
export const createAppointmentRequest = async (req, res) => {
  try {
    const {
      patient_id,
      patient_name,
      phone,
      age,
      gender,
      department,
      preferred_date,
      preferred_time,
      chief_complaint,
      symptoms,
    } = req.body;

    await pool.query(
      `INSERT INTO appointment_requests
      (
        patient_id,
        patient_name,
        phone,
        age,
        gender,
        department,
        preferred_date,
        preferred_time,
        chief_complaint,
        symptoms,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patient_id,
        patient_name,
        phone,
        age,
        gender,
        department,
        preferred_date,
        preferred_time,
        chief_complaint,
        symptoms,
        "Pending",
      ]
    );

    res.status(201).json({
      message: "Appointment request submitted successfully",
    });
  }catch (err) {
  console.error("CREATE REQUEST ERROR:", err);

  return res.status(500).json({
    message: err.sqlMessage || err.message,
  });
}
};

// Patient sees own requests
export const getPatientRequests = async (req, res) => {
  try {
    const { patientId } = req.params;

    const [rows] = await pool.query(
      `SELECT *
       FROM appointment_requests
       WHERE patient_id = ?
       ORDER BY created_at DESC`,
      [patientId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Staff sees ALL appointment requests
export const getAllRequests = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT *
       FROM appointment_requests
       ORDER BY created_at DESC`
    );

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Staff approves request and creates OP


// Staff rejects request
export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `UPDATE appointment_requests
       SET status='Rejected'
       WHERE id=?`,
      [id]
    );

    res.json({
      message: "Request rejected",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Staff approves request
export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor_id } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM appointment_requests WHERE id=?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const request = rows[0];

    const opNumber = `OP-${Date.now()}`;

    await pool.query(
      `INSERT INTO outpatient_records
      (
        op_number,
        patient_id,
        doctor_id,
        patient_name,
        phone,
        age,
        gender,
        chief_complaint,
        symptoms,
        priority,
        appointment_date,
        appointment_time,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [
        opNumber,
        request.patient_id,
        doctor_id,
        request.patient_name,
        request.phone,
        request.age,
        request.gender,
        request.chief_complaint,
        request.symptoms,
        "Normal",
        request.preferred_date,
        request.preferred_time,
      ]
    );

    await pool.query(
      `UPDATE appointment_requests
      SET status='Approved', doctor_id=?
      WHERE id=?`,
      [doctor_id, id]
    );

    res.json({
      message: "Appointment approved",
      opNumber,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};