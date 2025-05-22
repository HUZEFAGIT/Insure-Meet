const express = require('express');
const router = express.Router();
const upload = require('../middlewares/Upload');
const { uploadFiles, getUploads } = require('../controllers/uploadController');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Upload multiple files
router.post('/', upload.array('files'), uploadFiles);

router.get('/csv/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    // Check if file exists first
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'CSV file not found' });
    }

    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
        res.json(results);  // Send parsed CSV data
        console.log('CSV file parsed successfully:', results);  // Log parsed data
        })
        .on('error', (error) => {
        console.error('Error while reading CSV:', error);
        res.status(500).json({ message: 'Error reading CSV', error: error.message });
    });
});


// Get all uploads
router.get('/', getUploads);

module.exports = router;
