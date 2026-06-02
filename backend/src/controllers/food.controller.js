const foodModel = require("../models/foodModel.model.js");
const storageService = require("../services/storage.service.js");
const { v4: uuid } = require("uuid");
const {
  validateFoodName,
  validatePriceInDescription,
} = require("../utils/validations.js");

async function createFood(req, res) {
  try {
    // Validate food name
    const nameValidation = validateFoodName(req.body.name);
    if (!nameValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: nameValidation.error,
      });
    }

    // Validate price in description
    const priceValidation = validatePriceInDescription(req.body.description);
    if (!priceValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: priceValidation.error,
      });
    }

    // Validate video file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    // Upload video to storage
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
    );

    // Create food item with validated data
    const foodItemData = await foodModel.create({
      name: req.body.name.trim(),
      video: fileUploadResult.url,
      description: req.body.description.trim(),
      price: priceValidation.price,
      foodItem: nameValidation.foodItem,
      foodPartener: req.foodPartener._id,
    });

    res.status(201).json({
      success: true,
      message: "Food Created Successfully!",
      food: foodItemData,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || "Error creating food item",
    });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({});
    return res.status(200).json({
      success: true,
      message: "Food Items fetched Successfully!",
      foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching food items",
    });
  }
}

async function deleteFoodVideo(req, res) {
  try {
    const { id } = req.params;
    const foodItem = await foodModel.findByIdAndDelete(id);
    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting food item",
    });
  }
}

module.exports = { createFood, getFoodItems, deleteFoodVideo };
