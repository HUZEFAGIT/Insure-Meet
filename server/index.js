const express = require('express');
const database = require("./config/database");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const app = express();

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
