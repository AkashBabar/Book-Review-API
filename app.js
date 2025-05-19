const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookRoutes = require("./routes/bookRoutes");
app.use("/api", bookRoutes);

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api", reviewRoutes);

module.exports = app;
