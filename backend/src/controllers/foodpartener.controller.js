const foodModel = require("../models/foodModel.model.js");
const foodPartenerModel = require("../models/foodpartener.model.js");

async function getFoodPartenerById(req, res) {
  const fpModelID = req.params.id;
  const fp = await foodPartenerModel.findById(fpModelID);
  const foodItems = await foodModel.find({ foodPartener: fpModelID });

  if (!fp) {
    return res.status(404).json({
      message: "No Food Partener Found!",
    });
  }

  return res.status(200).json({
    message: "Partener Found Successfully",
    fp,
    foodItems,
  });
}

module.exports = { getFoodPartenerById };
