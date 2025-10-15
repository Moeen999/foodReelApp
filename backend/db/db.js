const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDB;
