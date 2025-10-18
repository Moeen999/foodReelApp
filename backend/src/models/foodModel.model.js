const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  foodPartener:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"foodpartener"
  }
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
