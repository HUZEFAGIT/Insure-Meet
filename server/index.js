const express = require('express');
const database = require("./config/database");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const uploadRoutes = require('./routes/uploadRoutes');
const testRoutes = require('./routes/test')
const userRoutes = require('./routes/user');
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true, // Allow cookies and auth headers
	methods: "GET,POST,PUT,DELETE",
	allowedHeaders: "Content-Type,Authorization"
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

app.use("/api/v1/auth", userRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/test',testRoutes)