import { FOOD_ITEMS } from "../constants/foodItems";

/**
 * Validates if the food name contains at least one valid food item
 * @param {string} name - The food name to validate
 * @returns {object} - { isValid: boolean, foodItem: string, error: string }
 */
export function validateFoodName(name) {
  if (!name || name.trim().length === 0) {
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
    error: `Food name must contain a valid food item like: ${FOOD_ITEMS.slice(
      0,
      5,
    ).join(", ")}...`,
    foodItem: null,
  };
}

/**
 * Validates if the description contains a valid price format
 * @param {string} description - The description to validate
 * @returns {object} - { isValid: boolean, price: number, error: string }
 */
export function validatePriceInDescription(description) {
  if (!description || description.trim().length < 10) {
    return {
      isValid: false,
      price: null,
      error: "Description must be at least 10 characters and include price",
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
    error: 'Include price in description (e.g., "Price: $15" or "Cost: $20" or "₹ 500")',
  };
}

/**
 * Validates video file properties on frontend
 * @param {File} file - The video file
 * @returns {object} - { isValid: boolean, error: string }
 */
export function validateVideoFile(file) {
  if (!file) {
    return {
      isValid: false,
      error: "Video file is required",
    };
  }

  const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
  const maxFileSize = 500 * 1024 * 1024; // 500MB

  if (!validVideoTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid video format. Use MP4, WebM, or OGG",
    };
  }

  if (file.size > maxFileSize) {
    return {
      isValid: false,
      error: "Video is too large (max 500MB)",
    };
  }

  if (file.size < 100 * 1024) {
    return {
      isValid: false,
      error: "Video is too small (min 100KB)",
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
 * @returns {object} - { isValid: boolean, errors: array }
 */
export function validateFoodData(foodData) {
  const errors = [];

  // Validate food name
  const nameValidation = validateFoodName(foodData.name);
  if (!nameValidation.isValid) {
    errors.push(nameValidation.error);
  }

  // Validate description and price
  const priceValidation = validatePriceInDescription(foodData.description);
  if (!priceValidation.isValid) {
    errors.push(priceValidation.error);
  }

  // Validate video
  const videoValidation = validateVideoFile(foodData.video);
  if (!videoValidation.isValid) {
    errors.push(videoValidation.error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
