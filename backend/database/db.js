const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = { pool, connectDB };