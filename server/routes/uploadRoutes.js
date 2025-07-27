const express = require('express');
const router = express.Router();
const upload = require('../middlewares/Upload');
const { uploadCSV, getMyUploads} = require('../controllers/uploadController');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const authenticateToken = require('../middlewares/authentication');

// Upload csv file
// router.post('/upload-csv',uploadCSV );
router.post('/uploadcsv', upload.single('file'), uploadCSV);
// Get all uploaded files
router.get('/get-uploaded-csv-data', getMyUploads);

//single fields upload
// router.post('/single-upload', singleUpload);

module.exports = router;
