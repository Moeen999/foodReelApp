const { FOOD_ITEMS } = require("../constants/foodItems");

/**
 * Validates if the food name contains at least one valid food item
 * @param {string} name - The food name to validate
 * @returns {object} - { isValid: boolean, foodItem: string }
 */
function validateFoodName(name) {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return {
      isValid: false,
      error: "Food name is required",
      foodItem: null,
    };
  }

  const trimmedName = name.trim();

  // Check if any valid food item is mentioned in the name
  for (const item of FOOD_ITEMS) {
    if (trimmedName.toLowerCase().includes(item.toLowerCase())) {
      return {
        isValid: true,
        foodItem: item,
        error: null,
      };
    }
  }

  return {
    isValid: false,
    error: `Food name must contain a valid food item. Valid items: ${FOOD_ITEMS.join(
      ", ",
    )}`,
    foodItem: null,
  };
}

/**
 * Validates if the description contains a valid price format
 * Expects formats like: "Price: $15", "Cost: $20.50", "Rs. 500"
 * @param {string} description - The description to validate
 * @returns {object} - { isValid: boolean, price: number, error: string }
 */
function validatePriceInDescription(description) {
  if (!description || typeof description !== "string") {
    return {
      isValid: false,
      price: null,
      error: "Description is required",
    };
  }

  // Pattern 1: "Price: $15" or "Price: $15.50"
  const pricePattern1 = /price\s*:\s*\$\s*(\d+(?:\.\d{2})?)/i;
  // Pattern 2: "Cost: $15"
  const costPattern = /cost\s*:\s*\$\s*(\d+(?:\.\d{2})?)/i;
  // Pattern 3: "Rs. 500" or "₹ 500"
  const indianPattern = /(?:rs\.?|₹)\s*(\d+(?:\.\d{2})?)/i;
  // Pattern 4: "Price is $15" or "It costs $20"
  const flexiblePattern = /(?:price|cost)\s+(?:is|:)?\s*\$\s*(\d+(?:\.\d{2})?)/i;

  const patterns = [pricePattern1, costPattern, indianPattern, flexiblePattern];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) {
      const price = parseFloat(match[1]);
      if (price > 0 && price <= 10000) {
        // Reasonable price range
        return {
          isValid: true,
          price,
          error: null,
        };
      }
    }
  }

  return {
    isValid: false,
    price: null,
    error:
      'Description must include price. Use formats like "Price: $15", "Cost: $20.50", or "₹ 500"',
  };
}

/**
 * Validates video file properties
 * @param {object} file - The file object
 * @returns {object} - { isValid: boolean, error: string }
 */
function validateVideoFile(file) {
  if (!file) {
    return {
      isValid: false,
      error: "Video file is required",
    };
  }

  const validVideoTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ];

  const maxFileSize = 500 * 1024 * 1024; // 500MB

  if (!validVideoTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid video format. Supported formats: MP4, WebM, OGG, MOV, AVI`,
    };
  }

  if (file.size > maxFileSize) {
    return {
      isValid: false,
      error: `Video file is too large. Maximum size: 500MB`,
    };
  }

  // Minimum file size (at least 100KB to be a valid video)
  if (file.size < 100 * 1024) {
    return {
      isValid: false,
      error: `Video file is too small. Minimum size: 100KB`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
}

/**
 * Comprehensive food data validation
 * @param {object} foodData - { name, description, video }
 * @returns {object} - { isValid: boolean, errors: array, data: object }
 */
function validateFoodData(foodData) {
  const errors = [];
  const data = {};

  // Validate food name
  const nameValidation = validateFoodName(foodData.name);
  if (!nameValidation.isValid) {
    errors.push(nameValidation.error);
  } else {
    data.foodItem = nameValidation.foodItem;
  }

  // Validate description and price
  const priceValidation = validatePriceInDescription(foodData.description);
  if (!priceValidation.isValid) {
    errors.push(priceValidation.error);
  } else {
    data.price = priceValidation.price;
  }

  return {
    isValid: errors.length === 0,
    errors,
    data,
  };
}

module.exports = {
  validateFoodName,
  validatePriceInDescription,
  validateVideoFile,
  validateFoodData,
  FOOD_ITEMS,
};
