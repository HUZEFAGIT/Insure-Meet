// // Import the Mongoose library
// const mongoose = require("mongoose")

// // Define the user schema using the Mongoose Schema constructor
// const userSchema = new mongoose.Schema(
//     {
//         // Define the name field with type String, required, and trimmed
//         fullName: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         // Define the email field with type String, required, and trimmed
//         email: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         // Define the password field with type String and required
//         password: {
//             type: String,
//             required: true,
//         },
//         token: {
//             type: String,
//         },
//     },
//     { timestamps: true }
// )

// // Export the Mongoose model for the user schema, using the name "user"
// module.exports = mongoose.model("user", userSchema)