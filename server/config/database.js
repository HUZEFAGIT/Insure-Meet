const { Pool } = require("pg");
require("dotenv").config();

const { DB_URL } = process.env;

const pool = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.connect()
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch((err) => {
    console.error("DB Connection Failed", err);
    process.exit(1);
  });

module.exports = pool;
