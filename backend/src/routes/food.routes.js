const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const multer = require("multer");

const uploadFile = multer({
  storage:multer.memoryStorage()
})

router.post(
  "/",
  authMiddleware.authFoodPartenerMiddleware,
  uploadFile.single("video"),
  foodController.createFood
);

module.exports = router;
