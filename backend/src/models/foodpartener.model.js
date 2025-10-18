const mongoose = require("mongoose");

const foodPartenerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const foodPartenerModel = mongoose.model("foodpartener", foodPartenerSchema);

module.exports = foodPartenerModel;