const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

router.post("/foodpartener/register", authController.registerFoodPartener);
router.post("/foodpartener/login", authController.loginFoodPartener);
router.get("/foodpartener/logout", authController.logoutFoodPartener);

module.exports = router;
