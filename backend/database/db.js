const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initSchema() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS calculations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      goalType VARCHAR(50) NOT NULL,
      goalName VARCHAR(255),
      cost DECIMAL(15,2) NOT NULL,
      years INT NOT NULL,
      inflation DECIMAL(5,2) NOT NULL,
      returnRate DECIMAL(5,2) NOT NULL,
      futureGoalValue DECIMAL(18,2) NOT NULL,
      monthlySIP DECIMAL(15,2) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.query(createTableSQL);
    console.log("✅ Database schema initialized");
  } catch (error) {
    console.error("❌ Failed to initialize database schema:", error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  pool,
  initSchema
};
