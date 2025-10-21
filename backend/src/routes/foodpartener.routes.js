const express = require("express");
const router = express.Router();
const foodPartenerController = require("../controllers/foodpartener.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js")

router.get(
  "/:id",
  authMiddleware.authUserMiddleware,
  foodPartenerController.getFoodPartenerById
);

module.exports = router;
