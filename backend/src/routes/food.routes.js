const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const multer = require("multer");

const uploadFile = multer({
  storage: multer.memoryStorage(),
});

//protected route
router.post(
  "/",
  authMiddleware.authFoodPartenerMiddleware,
  uploadFile.single("video"),
  foodController.createFood
);

router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);
module.exports = router;
