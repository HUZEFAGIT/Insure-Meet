const express = require('express');
const router = express.Router();
const { uploadFiles, getUploads } = require('../controllers/uploadController');
const pool = require('../config/database')

// Get all uploads
// router.get('/', getUploads);


router.get('/', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM appit_applications');
		res.status(200).json({
			success: true,
			data: result.rows,
		});
	} catch (err) {
		console.error('Error querying test table:', err);
		res.status(500).json({
			success: false,
			message: 'Error fetching data from test table',
		});
	}
});
module.exports = router;
