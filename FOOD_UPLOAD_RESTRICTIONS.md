# Food Video Upload Restrictions & Validations

## Overview
This document explains the new restrictions and validations implemented for the Food Reels application to ensure only legitimate food content is uploaded with proper pricing information.

## Implemented Restrictions

### 1. **Food Item Name Validation**
**What it does**: Ensures the food name contains a recognized food item name.

**Valid Food Items** (41 categories):
- Pizza, Burger, Pasta, Biryani, Sushi, Tacos, Curry, Steak, Chicken, Fish, Salad, Sandwich, Noodles, Rice, Bread, Soup, Dosa, Samosa, Kabab, Falafel, Ramen, BBQ, Grilled, Baked, Fried, Smoothie, Cake, Dessert, Coffee, Tea, Juice, Wrap, Bowl, Platter, Kebab, Shawarma, Dim Sum, Dumpling, Momos, Thali, Paneer, Seafood

**Example Valid Names**:
- ✅ "Spicy Chicken Pizza"
- ✅ "Gourmet Burger"
- ✅ "Homemade Pasta"
- ❌ "Random Video" (rejected)
- ❌ "My Day Vlog" (rejected)

**Implementation**:
- Frontend: Real-time validation with helpful error messages
- Backend: Server-side validation before processing

---

### 2. **Price Requirement in Description**
**What it does**: Mandates that every food item includes a fixed price in the description.

**Supported Price Formats**:
1. **USD Format**: `Price: $15` or `Price: $15.50`
2. **USD Alternative**: `Cost: $20` or `Cost: $20.99`
3. **Indian Rupees**: `₹ 500` or `Rs. 500`
4. **Flexible Format**: `Price is $15` or `It costs $20`

**Example Valid Descriptions**:
- ✅ "Delicious spicy pizza made fresh daily. Price: $15"
- ✅ "Premium beef burger with homemade sauce. Cost: $12.99"
- ✅ "Traditional Italian pasta. ₹ 450"
- ✅ "Fresh sushi rolls prepared by expert chefs. The price is $25"
- ❌ "Just a pizza without price info" (rejected)
- ❌ "Description with invalid price format" (rejected)

**Price Validation Rules**:
- Must be a number between $0.01 and $10,000
- Must follow one of the supported formats
- Description must be at least 10 characters long

**Implementation**:
- Frontend: Real-time validation showing detected price
- Backend: Price extracted and stored separately in database

---

### 3. **Video File Validation**
**What it does**: Ensures only legitimate video files are uploaded.

**Supported Formats**:
- MP4 (.mp4)
- WebM (.webm)
- OGG (.ogg)
- MOV (.mov)
- AVI (.avi)
- MKV (.mkv)

**File Size Requirements**:
- **Minimum**: 100 KB (ensures it's a real video)
- **Maximum**: 500 MB (practical upload limit)

**Example**:
- ✅ "cooking_pasta.mp4" (2 MB) - Valid
- ✅ "burger_prep.webm" (150 MB) - Valid
- ❌ "image.jpg" - Invalid format
- ❌ "video.mp4" (50 MB, but only 50 KB file size) - Invalid
- ❌ "huge_video.mp4" (800 MB) - File too large

**Implementation**:
- Frontend: Browser-level validation with helpful error messages
- Backend: Multer middleware enforces file constraints
- Storage: Additional checks before upload to ImageKit

---

## Database Schema Updates

### Food Model New Fields
```javascript
{
  name: String,              // Food name (must contain valid food item)
  video: String,             // Video URL from ImageKit
  description: String,       // Food description (must include price)
  price: Number,             // Extracted price (stored separately)
  foodItem: String,          // Detected food item category
  foodPartener: ObjectId,    // Reference to food partner
  createdAt: Date,           // Creation timestamp
  updatedAt: Date            // Last update timestamp
}
```

---

## Frontend Validation Features

### Real-Time Feedback
The CreateFood component now provides:

1. **Green Success Indicators** (✓)
   - Shows when food item is detected: "Great! 'Pizza' detected in your food name"
   - Shows when price is found: "Price detected: $15.00"
   - Shows when video is valid: "Video selected: pizza.mp4 (45.32MB)"

2. **Red Error Indicators** (✗)
   - Shows validation failures immediately
   - Helps users fix issues before submission

3. **Helpful Hints**
   - Shows valid food item examples
   - Shows supported price formats
   - Shows video format and size limits

4. **Submit Button Control**
   - Disabled if any validation errors exist
   - Shows loading state during upload

---

## Backend Validation Flow

```
Request → Multer File Validation
         ↓
         File Size/Type Check
         ↓
         Food Name Validation
         ↓
         Price Format Validation
         ↓
         Upload to Storage Service
         ↓
         Save to Database
         ↓
         Response
```

### Error Responses
All validation failures return clear error messages:
```json
{
  "success": false,
  "message": "Food name must contain a valid food item..."
}
```

---

## How to Extend Food Items List

### Backend (Add to `backend/src/constants/foodItems.js`)
```javascript
const FOOD_ITEMS = [
  "Pizza",
  "Burger",
  // Add new items here
  "YourNewItem",
];
```

### Frontend (Add to `frontend/src/constants/foodItems.js`)
```javascript
export const FOOD_ITEMS = [
  "Pizza",
  "Burger",
  // Add new items here
  "YourNewItem",
];
```

**Note**: Keep both in sync for consistency.

---

## Price Extraction Examples

| Input Description | Extracted Price |
|------------------|-----------------|
| "Delicious pizza. Price: $15" | $15.00 |
| "Fresh sushi. Cost: $25.99" | $25.99 |
| "Traditional food. ₹ 500" | ₹500 |
| "Premium meal. Rs. 300" | ₹300 |
| "Gourmet burger for $45.50" | $45.50 |

---

## Files Modified/Created

### Backend
1. **`backend/src/constants/foodItems.js`** (NEW)
   - Centralized list of valid food items

2. **`backend/src/utils/validations.js`** (NEW)
   - Core validation logic
   - Functions: `validateFoodName()`, `validatePriceInDescription()`, `validateVideoFile()`, `validateFoodData()`

3. **`backend/src/models/foodModel.model.js`** (UPDATED)
   - Added `price` field
   - Added `foodItem` field
   - Enhanced validation rules
   - Added timestamps

4. **`backend/src/controllers/food.controller.js`** (UPDATED)
   - Integrated validation checks
   - Better error handling
   - Extracted price storage

5. **`backend/src/routes/food.routes.js`** (UPDATED)
   - Enhanced multer configuration
   - File size and type restrictions
   - Error handling middleware

### Frontend
1. **`frontend/src/constants/foodItems.js`** (NEW)
   - Frontend copy of valid food items

2. **`frontend/src/utils/foodValidations.js`** (NEW)
   - Client-side validation functions
   - Mirrors backend validation logic

3. **`frontend/src/pages/food-partener/CreateFood.jsx`** (UPDATED)
   - Integrated validations
   - Real-time feedback UI
   - Enhanced error handling
   - Better UX with icons and colors

---

## Testing the Implementation

### Test Case 1: Valid Submission
```
Name: "Spicy Chicken Pizza"
Description: "Delicious pizza with fresh toppings. Price: $15"
Video: "pizza.mp4" (50MB)
Result: ✅ Success
```

### Test Case 2: Invalid Food Item
```
Name: "My Cooking Vlog"
Description: "Just sharing my cooking. Price: $10"
Video: "video.mp4"
Result: ❌ Error: "Food name must contain a valid food item"
```

### Test Case 3: Missing Price
```
Name: "Homemade Burger"
Description: "Delicious burger with fresh ingredients"
Video: "burger.mp4"
Result: ❌ Error: "Include price in description..."
```

### Test Case 4: Invalid Video Format
```
Name: "Pizza Video"
Description: "Yummy pizza. Price: $12"
Video: "pizza.jpg" (image file)
Result: ❌ Error: "Invalid video format. Use MP4, WebM, or OGG"
```

---

## Security & Best Practices

1. **Server-side Validation**: All validations also run on backend (never trust client)
2. **File Size Limits**: Enforced at multiple levels (frontend hint + multer + storage)
3. **Type Checking**: Only specified MIME types accepted
4. **Price Range**: Validates price is realistic (max $10,000)
5. **Input Sanitization**: All inputs trimmed and validated

---

## Future Enhancements

Potential improvements:
1. Video duration validation (e.g., 15-60 seconds)
2. Video thumbnail generation and validation
3. ML-based food detection from thumbnail
4. Nutritional information validation
5. Allergen information requirements
6. Multi-language support for food items
7. Category-based pricing suggestions
8. Duplicate video detection

---

## Support & Troubleshooting

### Common Issues

**Issue**: "Food name must contain a valid food item"
- **Solution**: Ensure your food name includes one of the 41 valid items

**Issue**: "Include price in description"
- **Solution**: Add price using formats: `Price: $15`, `Cost: $20`, or `₹ 500`

**Issue**: "Video file is too large"
- **Solution**: Compress video to under 500MB or use video editing tools

**Issue**: "Invalid video format"
- **Solution**: Convert video to MP4, WebM, or OGG format
