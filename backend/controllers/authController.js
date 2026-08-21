import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { full_name, email, phone, age, gender, password } = req.body;

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users
      (full_name, email, phone, age, gender, password)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [full_name, email, phone, age, gender, hashedPassword]
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    console.log("User found:", user.id);
    console.log("Password column:", user.password);

    if (!user.password) {
      return res.status(500).json({
        message: "Password hash missing in database",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const createStaffUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      password,
      role,
    } = req.body;

    const allowedRoles = ["doctor", "staff", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await pool.query(
      `INSERT INTO users
      (full_name, email, phone, password, role)
      VALUES (?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        phone,
        hashedPassword,
        role,
      ]
    );

    res.status(201).json({
      message: `${role} user created successfully`,
    });

  } catch (error) {
    console.error("CREATE STAFF USER ERROR:", error);

    res.status(500).json({
      message: "Unable to create user",
    });
  }
};
// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    // Check if user already exists
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    let user;

    if (users.length === 0) {
      // Create new patient account
      const [result] = await pool.query(
        `INSERT INTO users
        (full_name, email, role, photo)
        VALUES (?, ?, ?, ?)`,
        [name, email, "patient", photo]
      );

      user = {
        id: result.insertId,
        full_name: name,
        email,
        role: "patient",
        photo,
      };
    } else {
      user = users[0];
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Google Login Successful",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({
      message: "Google Login Failed",
    });
  }
};