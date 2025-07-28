// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  sendRegistrationOtp,
  register,
  login,
  verifyRegistrationOtp
} = require("../controllers/Auth")

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/send-otp", sendRegistrationOtp)
router.post("/verify-otp", verifyRegistrationOtp)

// Export the router for use in the main application
module.exports = router