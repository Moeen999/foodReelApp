const foodModel = require("../models/foodModel.model.js");
const storageService = require("../services/storage.service.js");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  const foodItemData = await foodModel.create({
    name: req.body.name,
    video: fileUploadResult.url,
    description: req.body.description,
    foodPartener: req.foodPartener._id,
  });
  res.status(201).send({
    message: "Food Created Successfully!",
    food: foodItemData,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  return res.status(200).json({
    message: "Food Items fetched Succesfully!",
    foodItems,
  });
}
module.exports = { createFood, getFoodItems };
