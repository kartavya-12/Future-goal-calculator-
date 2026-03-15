const express = require("express");
const router = express.Router();
const { calculateGoal } = require("../controllers/goalCalculator");

// POST /api/calculate-goal
router.post("/calculate-goal", calculateGoal);

module.exports = router;

