//! create the server

const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes.js");
const foodRoutes = require("../src/routes/food.routes.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

module.exports = app;
