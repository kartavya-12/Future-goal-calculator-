const { pool } = require("../database/db");

function calculateFutureGoalValue(cost, years, inflation) {
  const inflationRate = inflation / 100;
  const fv = cost * Math.pow(1 + inflationRate, years);
  return fv;
}

function calculateMonthlySIP(futureGoalValue, years, returnRate) {
  const annualRate = returnRate / 100;
  const r = annualRate / 12;
  const n = years * 12;

  if (n <= 0) return 0;
  if (r === 0) {
    return futureGoalValue / n;
  }

  const factor = Math.pow(1 + r, n);
  const sip = (futureGoalValue * r) / ((factor - 1) * (1 + r));
  return sip;
}

function calculateWealthGenerated(futureGoalValue, totalInvestment) {
  return futureGoalValue - totalInvestment;
}

async function calculateGoal(req, res) {
  try {
    const {
      goalType = "Custom",
      goalName = "",
      cost,
      years,
      inflation,
      returnRate
    } = req.body || {};

    const numericCost = Number(cost);
    const numericYears = Number(years);
    const numericInflation = Number(inflation);
    const numericReturnRate = Number(returnRate);

    if (
      !Number.isFinite(numericCost) ||
      !Number.isFinite(numericYears) ||
      !Number.isFinite(numericInflation) ||
      !Number.isFinite(numericReturnRate) ||
      numericCost <= 0 ||
      numericYears <= 0
    ) {
      return res.status(400).json({ error: "Invalid input values." });
    }

    const futureGoalValue = calculateFutureGoalValue(
      numericCost,
      numericYears,
      numericInflation
    );
    const monthlySIP = calculateMonthlySIP(
      futureGoalValue,
      numericYears,
      numericReturnRate
    );
    const totalInvestment = monthlySIP * numericYears * 12;
    const wealthGenerated = calculateWealthGenerated(
      futureGoalValue,
      totalInvestment
    );

    try {
      const connection = await pool.getConnection();
      try {
        await connection.query(
          `INSERT INTO calculations 
            (goalType, goalName, cost, years, inflation, returnRate, futureGoalValue, monthlySIP) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            goalType,
            goalName || null,
            numericCost,
            numericYears,
            numericInflation,
            numericReturnRate,
            futureGoalValue,
            monthlySIP
          ]
        );
      } finally {
        connection.release();
      }
    } catch (dbErr) {
      // Log but don't fail the API for db issues
      console.error("DB error while saving calculation:", dbErr.message);
    }

    return res.json({
      futureGoalValue,
      monthlySIP,
      totalInvestment,
      wealthGenerated
    });
  } catch (err) {
    console.error("Error in calculateGoal:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = {
  calculateGoal
};

