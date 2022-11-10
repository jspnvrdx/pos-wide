const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = 8000;
// * middleware
app.use(express.json());
app.use(cors());

// Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard
app.use("/dashboard", require("./routes/Dashboard"));

// POS

// Users

// Inventory

// Sales report

// Widget

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
