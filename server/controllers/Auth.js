const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Send OTP for registration
exports.sendRegistrationOtp = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, mobile, role, status, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !userName || !email || !mobile || !role || !status || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }
    // Check if user exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1 OR user_name = $2", [email, userName]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }
    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    // Store OTP and registration data in user_otps
    await pool.query(
      `INSERT INTO user_otps (email, otp, data) VALUES ($1, $2, $3)` ,
      [email, otp, JSON.stringify({ firstName, lastName, userName, email, mobile, role, status, password })]
    );
    // Send OTP via email
    await mailSender(email, "Your Registration OTP", `Your OTP is: ${otp}`);
    return res.status(200).json({ success: true, message: "OTP sent to email." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};

// Verify OTP and register user
exports.verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp, confirmPassword } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP required." });
    }
    // Find OTP record
    const otpResult = await pool.query("SELECT * FROM user_otps WHERE email = $1 ORDER BY created_at DESC LIMIT 1", [email]);
    if (otpResult.rows.length === 0 || otpResult.rows[0].otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
    const regData = otpResult.rows[0].data;
    // Check if user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1 OR user_name = $2", [regData.email, regData.userName]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(regData.password, 10);
    // Insert user
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, user_name, email, mobile, role, status, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, first_name, last_name, user_name, email, mobile, role, status, created_at` ,
      [regData.firstName, regData.lastName, regData.userName, regData.email, regData.mobile, regData.role, regData.status, hashedPassword]
    );
    // Optionally, delete OTP record after use
    await pool.query("DELETE FROM user_otps WHERE email = $1", [email]);
    return res.status(201).json({ success: true, user: result.rows[0], message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Registration failed." });
  }
};

// Registration for all roles
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, mobile, role, status, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !userName || !email || !mobile || !role || !status || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }
    // Check if user exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1 OR user_name = $2", [email, userName]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, user_name, email, mobile, role, status, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, first_name, last_name, user_name, email, mobile, role, status, created_at` ,
      [firstName, lastName, userName, email, mobile, role, status, hashedPassword]
    );
    return res.status(201).json({ success: true, user: result.rows[0], message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Registration failed." });
  }
};

// Login: Check credentials and return token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required." });
    }
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: "User not found." });
    }
    const user = userResult.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    delete user.password;
    return res.status(200).json({ success: true, token, user, message: "Login successful." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Login failed." });
  }
};


