import pool from "../config/db.js";

// Add Doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      specialization,
      department,
      experience,
      consultation_fee,
      available_days,
      start_time,
      end_time,
      room_number,
    } = req.body;

    const photo = req.file
      ? `/uploads/doctors/${req.file.filename}`
      : null;

    await pool.query(
      `INSERT INTO doctors
      (name,email,phone,specialization,department,
      experience,consultation_fee,available_days,
      start_time,end_time,room_number,photo)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        name,
        email,
        phone,
        specialization,
        department,
        experience,
        consultation_fee,
        available_days,
        start_time,
        end_time,
        room_number,
        photo,
      ]
    );

    res.status(201).json({
      message: "Doctor added successfully",
    });

  } catch (err) {
    console.error("ADD DOCTOR ERROR:", err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Doctors
export const getDoctors = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM doctors ORDER BY name ASC"
    );

    res.json(rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Doctor
export const getDoctorById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM doctors WHERE id=?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json(rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM doctors WHERE id=?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json({
      message: "Doctor deleted successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};