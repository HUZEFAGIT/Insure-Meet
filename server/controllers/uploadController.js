const Upload = require('../models/Upload');

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const uploadFiles = async (req, res) => {
  console.log('Received request to upload files');  // 📍1
  try {
    const { title } = req.body;
    console.log('Title:', title);  // 📍2

    if (!req.files || req.files.length === 0) {
      console.log('No files received');  // 📍3
      return res.status(400).json({ message: 'No files uploaded' });
    }

    console.log('Files received:', req.files.map(file => file.originalname));  // 📍4

    // Parse each file and save the data to the database
    const files = [];
    for (const file of req.files) {
      const filePath = path.join(__dirname, '..', 'uploads', file.filename);
      const results = [];

      // Parse CSV file
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
            console.log('CSV file parsed successfully:', results);  // 📍5
            resolve();
          })
          .on('error', (error) => {
            console.error('Error parsing CSV:', error);
            reject(error);
          });
      });

      // Store parsed data in the database
      files.push({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        data: results, // Store the parsed CSV data
      });
    }

    // Save the upload information to the database
    const upload = new Upload({
      title,
      files,
    });

    console.log('Saving upload to database...');  // 📍6
    await upload.save();
    console.log('Upload saved successfully!');    // 📍7

    res.status(201).json({ message: 'Files uploaded successfully', upload });
  } catch (error) {
    console.error('Error uploading files:', error);  // 📍8
    res.status(500).json({ message: 'Error uploading files', error });
  }
};


const getUploads = async (req, res) => {
  console.log('Received request to fetch uploads');  // 📍1
  try {
    const uploads = await Upload.find();  // Fetch all uploads from the DB
    console.log(`Found ${uploads.length} uploads`);  // 📍2
    res.status(200).json(uploads);  // Send the uploads data as response
  } catch (error) {
    console.error('Error retrieving uploads:', error);  // 📍3
    res.status(500).json({ message: 'Error retrieving uploads', error });
  }
};

module.exports = { uploadFiles, getUploads };
