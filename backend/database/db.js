const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "future_goals_calculator",
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

  const connection = await pool.getConnection();
  try {
    await connection.query(createTableSQL);
  } finally {
    connection.release();
  }
}

module.exports = {
  pool,
  initSchema
};

