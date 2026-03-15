const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initSchema } = require("./database/db");
const calculatorRoutes = require("./routes/calculator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

/*
  CORS CONFIGURATION
  Allow requests from your frontend (Railway or local)
*/
app.use(
  cors({
    origin: "*", // allow all origins (safe for this project)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

/*
  Health check route
*/
app.get("/", (req, res) => {
  res.send("Future Goals Investment Calculator API");
});

/*
  API routes
*/
app.use("/api", calculatorRoutes);

/*
  404 handler
*/
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

/*
  Global error handler
*/
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

/*
  Start server after DB schema is ready
*/
initSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 API server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to initialize database schema:", err);
    process.exit(1);
  });