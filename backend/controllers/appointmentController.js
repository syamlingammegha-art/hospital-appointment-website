import pool from "../config/db.js";

/* =========================================================
   BOOK APPOINTMENT
========================================================= */

export const bookAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;

    const {
      doctor_id,
      appointment_date,
      appointment_time,
    } = req.body;

    if (!doctor_id || !appointment_date || !appointment_time) {
      return res.status(400).json({
        message: "Doctor, date and time are required",
      });
    }

    // Check doctor exists
    const [doctor] = await pool.query(
      "SELECT id FROM doctors WHERE id = ?",
      [doctor_id]
    );

    if (doctor.length === 0) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // Check duplicate slot
    const [existing] = await pool.query(
      `SELECT id
       FROM appointments
       WHERE doctor_id = ?
       AND appointment_date = ?
       AND appointment_time = ?
       AND status != 'Cancelled'`,
      [
        doctor_id,
        appointment_date,
        appointment_time,
      ]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    // Insert appointment
    await pool.query(
      `INSERT INTO appointments
       (patient_id, doctor_id, appointment_date, appointment_time)
       VALUES (?, ?, ?, ?)`,
      [
        patientId,
        doctor_id,
        appointment_date,
        appointment_time,
      ]
    );

    res.status(201).json({
      message: "Appointment booked successfully",
    });

  } catch (error) {
    console.error("BOOK APPOINTMENT ERROR:", error);

    res.status(500).json({
      message: "Unable to book appointment",
    });
  }
};


/* =========================================================
   GET ALL APPOINTMENTS
========================================================= */

export const getAppointments = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        a.id,
        u.full_name AS patient_name,
        u.email AS patient_email,
        d.id AS doctor_id,
        d.name AS doctor_name,
        d.specialization,
        d.consultation_fee,
        d.image,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.created_at
       FROM appointments a
       INNER JOIN users u
         ON a.patient_id = u.id
       INNER JOIN doctors d
         ON a.doctor_id = d.id
       ORDER BY
         a.appointment_date ASC,
         a.appointment_time ASC`
    );

    res.status(200).json(rows);

  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);

    res.status(500).json({
      message: "Unable to fetch appointments",
    });
  }
};


/* =========================================================
   GET MY APPOINTMENTS
========================================================= */

export const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const [rows] = await pool.query(
      `SELECT
        a.id,
        a.patient_id,
        a.doctor_id,
        d.name AS doctor_name,
        d.specialization,
        d.experience,
        d.consultation_fee,
        d.image,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.created_at
       FROM appointments a
       INNER JOIN doctors d
         ON a.doctor_id = d.id
       WHERE a.patient_id = ?
       ORDER BY
         a.appointment_date ASC,
         a.appointment_time ASC`,
      [patientId]
    );

    res.status(200).json(rows);

  } catch (error) {
    console.error("GET MY APPOINTMENTS ERROR:", error);

    res.status(500).json({
      message: "Unable to fetch your appointments",
    });
  }
};


/* =========================================================
   CANCEL APPOINTMENT
========================================================= */

export const cancelAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;
    const appointmentId = req.params.id;

    const [appointments] = await pool.query(
      `SELECT id, status
       FROM appointments
       WHERE id = ?
       AND patient_id = ?`,
      [appointmentId, patientId]
    );

    if (appointments.length === 0) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const appointment = appointments[0];

    if (appointment.status === "Completed") {
      return res.status(400).json({
        message: "Completed appointment cannot be cancelled",
      });
    }

    if (appointment.status === "Cancelled") {
      return res.status(400).json({
        message: "Appointment is already cancelled",
      });
    }

    await pool.query(
      `UPDATE appointments
       SET status = 'Cancelled'
       WHERE id = ?
       AND patient_id = ?`,
      [appointmentId, patientId]
    );

    res.status(200).json({
      message: "Appointment cancelled successfully",
    });

  } catch (error) {
    console.error("CANCEL APPOINTMENT ERROR:", error);

    res.status(500).json({
      message: "Unable to cancel appointment",
    });
  }
};


/* =========================================================
   RESCHEDULE APPOINTMENT
========================================================= */

export const rescheduleAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;
    const appointmentId = req.params.id;

    const {
      appointment_date,
      appointment_time,
    } = req.body;

    if (!appointment_date || !appointment_time) {
      return res.status(400).json({
        message: "Date and time are required",
      });
    }

    const [appointments] = await pool.query(
      `SELECT
        id,
        doctor_id,
        status
       FROM appointments
       WHERE id = ?
       AND patient_id = ?`,
      [appointmentId, patientId]
    );

    if (appointments.length === 0) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const appointment = appointments[0];

    if (appointment.status === "Completed") {
      return res.status(400).json({
        message: "Completed appointment cannot be rescheduled",
      });
    }

    if (appointment.status === "Cancelled") {
      return res.status(400).json({
        message: "Cancelled appointment cannot be rescheduled",
      });
    }

    // Check whether another appointment occupies the slot
    const [existing] = await pool.query(
      `SELECT id
       FROM appointments
       WHERE doctor_id = ?
       AND appointment_date = ?
       AND appointment_time = ?
       AND status != 'Cancelled'
       AND id != ?`,
      [
        appointment.doctor_id,
        appointment_date,
        appointment_time,
        appointmentId,
      ]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "That time slot is already booked",
      });
    }

    await pool.query(
      `UPDATE appointments
       SET appointment_date = ?,
           appointment_time = ?,
           status = 'Pending'
       WHERE id = ?
       AND patient_id = ?`,
      [
        appointment_date,
        appointment_time,
        appointmentId,
        patientId,
      ]
    );

    res.status(200).json({
      message: "Appointment rescheduled successfully",
    });

  } catch (error) {
    console.error("RESCHEDULE APPOINTMENT ERROR:", error);

    res.status(500).json({
      message: "Unable to reschedule appointment",
    });
  }
};
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorUserId = req.user.id;

    const [doctor] = await pool.query(
      `SELECT id
       FROM doctor_profiles
       WHERE user_id = ?`,
      [doctorUserId]
    );

    if (doctor.length === 0) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    const doctorId = doctor[0].id;

    const [rows] = await pool.query(
      `SELECT
        a.id,
        a.patient_id,
        u.full_name AS patient_name,
        u.email AS patient_email,
        u.phone AS patient_phone,
        u.age,
        u.gender,
        a.appointment_date,
        a.appointment_time,
        a.status
       FROM appointments a
       INNER JOIN users u
         ON a.patient_id = u.id
       WHERE a.doctor_id = ?
       ORDER BY
         a.appointment_date ASC,
         a.appointment_time ASC`,
      [doctorId]
    );

    res.json(rows);

  } catch (error) {
    console.error(
      "GET DOCTOR APPOINTMENTS ERROR:",
      error
    );

    res.status(500).json({
      message: "Unable to fetch doctor appointments",
    });
  }
};