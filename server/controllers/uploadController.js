const pool = require('../config/database');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const XLSX = require('xlsx');

// Helper: Convert Excel serial date to JS date string (YYYY-MM-DD)
function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  return date_info.toISOString().split('T')[0];
}

// Generic parser for date fields
function parseDate(value) {
  if (!value) return null;
  if (!isNaN(value)) return excelDateToJSDate(value);
  return value;
}

// POST /uploadcsv
const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const results = [];

    const ext = path.extname(req.file.originalname).toLowerCase();

    if (ext === '.csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          console.log('Column Names:', Object.keys(results[0]));
          console.log('Data:', results);
          await saveRowsToDb(results, req, res);
        })
        .on('error', (error) => {
          res.status(500).json({ message: 'Error parsing CSV', error });
        });
    } else if (ext === '.xlsx' || ext === '.xls') {
      try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        // console.log('Column Names:', Object.keys(jsonData[0]));
        // console.log('Data:', jsonData);
        await saveRowsToDb(jsonData, req, res);
      } catch (error) {
        res.status(500).json({ message: 'Error parsing Excel file', error });
      }
    } else {
      res.status(400).json({ message: 'Unsupported file type. Please upload a CSV or Excel file.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};

// Helper function to save rows to DB
async function saveRowsToDb(rows, req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log(`Starting DB transaction. Total rows: ${rows.length}`);

    let insertedCount = 0;
    let skippedCount = 0;
    const skippedRows = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 1;
      const applicationNumber = row['Application Number'];

      try {
        // Check if application_number already exists in the database
        const checkResult = await client.query(
          'SELECT application_number FROM user_uploads WHERE application_number = $1',
          [applicationNumber]
        );

        if (checkResult.rows.length > 0) {
          // Application number already exists, skip this row
          console.log(`⏭️ Skipping row ${rowNumber}: Application number ${applicationNumber} already exists`);
          skippedCount++;
          skippedRows.push({
            rowNumber,
            applicationNumber,
            reason: 'Application number already exists'
          });
          continue;
        }

        console.log(`Inserting row ${rowNumber}:`, row);

        await client.query(
          `INSERT INTO user_uploads (
            application_type, application_number, name_of_la, dob_insured_person, nominee_name, nominee_relation, address, state, mobile_no_of_la, application_form, priority
          ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
          )`,
          [
            row['Application_Type'],
            applicationNumber,
            row['Name Of La'],
            parseDate(row['Dob Insusred Person']),
            row['Nominee Name'],
            row['Nominee Relation'],
            row['Address'],
            row['State'],
            row['Mobile No Of La'],
            row['Application_Form'],
            row['Priority']
          ]
        );

        console.log(`✅ Row ${rowNumber} inserted successfully.`);
        insertedCount++;
      } catch (rowError) {
        console.error(`❌ Error inserting row ${rowNumber}:`, row);
        console.error(rowError);
        throw rowError; // re-throw to trigger rollback
      }
    }

    await client.query('COMMIT');
    console.log(`✅ Transaction completed. Inserted: ${insertedCount}, Skipped: ${skippedCount}`);
    
    const response = {
      message: 'File uploaded and data processed',
      inserted: insertedCount,
      skipped: skippedCount,
      total: rows.length
    };

    if (skippedRows.length > 0) {
      response.skippedRows = skippedRows;
    }

    res.status(201).json(response);
  } catch (err) {
    console.error('⛔ Error during DB transaction. Rolling back.', err);
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Error saving data to database', error: err });
  } finally {
    console.log('🔚 Releasing DB client.');
    client.release();
  }
}


// GET /myuploads
const getMyUploads = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM user_uploads');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching uploads', error });
  }
};

// POST /single-upload
// const singleUpload = async (req, res) => {
//   try {
//     const {
//       application_no,
//       proposal_no,
//       policy_id,
//       la_name,
//       la_dob,
//       nominee_dob,
//       gender,
//       mer_type,
//       proposer_name,
//       phone_no,
//       alt_phone_no,
//       email,
//       identification_no,
//       state,
//       city,
//       country,
//       diagnostic_center,
//       test_detail,
//       agent_name,
//       agent_contact_no
//     } = req.body;

//     const client = await pool.connect();
//     try {
//       await client.query(
//         `INSERT INTO user_uploads (
//           application_no, proposal_no, policy_id, la_name, la_dob, nominee_dob, gender, mer_type, proposer_name, phone_no, alt_phone_no, email, identification_no, state, city, country, diagnostic_center, test_detail, agent_name, agent_contact_no
//         ) VALUES (
//           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20
//         )`,
//         [
//           application_no,
//           proposal_no,
//           policy_id,
//           la_name,
//           la_dob,
//           nominee_dob,
//           gender,
//           mer_type,
//           proposer_name,
//           phone_no,
//           alt_phone_no,
//           email,
//           identification_no,
//           state,
//           city,
//           country,
//           diagnostic_center,
//           test_detail,
//           agent_name,
//           agent_contact_no
//         ]
//       );
//       res.status(201).json({ message: 'Single upload successful' });
//     } catch (err) {
//       res.status(500).json({ message: 'Error saving data to database', error: err });
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading single data', error });
//   }
// };

module.exports = { uploadCSV, getMyUploads };
