const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initSchema } = require("./database/db");
const calculatorRoutes = require("./routes/calculator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Future Goals Investment Calculator API");
});

app.use("/api", calculatorRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

initSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database schema:", err);
    process.exit(1);
  });

