const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const multer = require("multer");

// Enhanced multer configuration with file validation
const uploadFile = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid video format. Supported: MP4, WebM, OGG, MOV, AVI, MKV",
        ),
      );
    }
  },
});

// Custom error handler middleware for multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "FILE_TOO_LARGE") {
      return res.status(400).json({
        success: false,
        message: "Video file is too large (max 50MB)",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Only one file is allowed",
      });
    }
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "File upload error",
    });
  }
  next();
};

//protected route for creating food
router.post(
  "/",
  authMiddleware.authFoodPartenerMiddleware,
  uploadFile.single("video"),
  handleMulterError,
  foodController.createFood,
);

router.get(
  "/",
  authMiddleware.authUserMiddleware,
  foodController.getFoodItems,
);

router.delete(
  "/delete/:id",
  authMiddleware.authFoodPartenerMiddleware,
  foodController.deleteFoodVideo,
);

module.exports = router;
