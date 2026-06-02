import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { Loader2Icon, AlertCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  validateFoodName,
  validatePriceInDescription,
  validateVideoFile,
  validateFoodData,
} from "../../utils/foodValidations";
import { FOOD_ITEMS } from "../../constants/foodItems";

const CreateFood = () => {
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    video: null,
  });
  const [uploading, setUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [validationSuccess, setValidationSuccess] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (name === "name") {
      const validation = validateFoodName(value);
      if (validation.isValid) {
        setValidationSuccess((prev) => ({
          ...prev,
          name: `Great! "${validation.foodItem}" detected in your food name`,
        }));
        setValidationErrors((prev) => ({
          ...prev,
          name: null,
        }));
      } else if (value.length > 0) {
        setValidationErrors((prev) => ({
          ...prev,
          name: validation.error,
        }));
        setValidationSuccess((prev) => ({
          ...prev,
          name: null,
        }));
      }
    }

    if (name === "description") {
      const validation = validatePriceInDescription(value);
      if (validation.isValid) {
        setValidationSuccess((prev) => ({
          ...prev,
          description: `Price detected: $${validation.price.toFixed(2)}`,
        }));
        setValidationErrors((prev) => ({
          ...prev,
          description: null,
        }));
      } else if (value.length > 0) {
        setValidationErrors((prev) => ({
          ...prev,
          description: validation.error,
        }));
        setValidationSuccess((prev) => ({
          ...prev,
          description: null,
        }));
      }
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateVideoFile(file);
      if (validation.isValid) {
        setFoodData((prev) => ({
          ...prev,
          video: file,
        }));
        setValidationSuccess((prev) => ({
          ...prev,
          video: `Video selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(
            2,
          )}MB)`,
        }));
        setValidationErrors((prev) => ({
          ...prev,
          video: null,
        }));
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          video: validation.error,
        }));
        setValidationSuccess((prev) => ({
          ...prev,
          video: null,
        }));
        setFoodData((prev) => ({
          ...prev,
          video: null,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive validation
    const validation = validateFoodData(foodData);
    if (!validation.isValid) {
      validation.errors.forEach((error) => {
        toast.error(error);
      });
      setValidationErrors({
        name: !validateFoodName(foodData.name).isValid
          ? validateFoodName(foodData.name).error
          : null,
        description: !validatePriceInDescription(foodData.description).isValid
          ? validatePriceInDescription(foodData.description).error
          : null,
        video: foodData.video
          ? !validateVideoFile(foodData.video).isValid
            ? validateVideoFile(foodData.video).error
            : null
          : "Video file is required",
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("video", foodData.video);
      formData.append("name", foodData.name);
      formData.append("description", foodData.description);

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/food`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (data.food) {
        toast.success(data.message || "Food video uploaded successfully!");
        setFoodData({ name: "", description: "", video: null });
        setValidationErrors({});
        setValidationSuccess({});
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      console.error("Error uploading food video:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">🍕 Upload a Food Video</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
          Share your delicious food content with proper details
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Food Item Name */}
          <div className="form-group">
            <label className="form-label">Food Item Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Spicy Chicken Pizza, Chocolate Cake"
              name="name"
              value={foodData.name}
              onChange={handleInputChange}
              required={true}
            />
            {validationErrors.name && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#dc2626",
                  marginTop: "8px",
                  fontSize: "14px",
                }}
              >
                <AlertCircle size={16} />
                {validationErrors.name}
              </div>
            )}
            {validationSuccess.name && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#16a34a",
                  marginTop: "8px",
                  fontSize: "14px",
                }}
              >
                <CheckCircle2 size={16} />
                {validationSuccess.name}
              </div>
            )}
            <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
              Must include a food item name like: {FOOD_ITEMS.slice(0, 8).join(", ")}...
            </p>
          </div>

          {/* Description with Price */}
          <div className="form-group">
            <label className="form-label">Description & Price *</label>
            <textarea
              className="form-input"
              placeholder="Describe your food... Include price like 'Price: $15' or 'Cost: $20.50' or '₹ 500'"
              name="description"
              value={foodData.description}
              onChange={handleInputChange}
              rows="4"
              required={true}
            />
            {validationErrors.description && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#dc2626",
                  marginTop: "8px",
                  fontSize: "14px",
                }}
              >
                <AlertCircle size={16} />
                {validationErrors.description}
              </div>
            )}
            {validationSuccess.description && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#16a34a",
                  marginTop: "8px",
                  fontSize: "14px",
                }}
              >
                <CheckCircle2 size={16} />
                {validationSuccess.description}
              </div>
            )}
            <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
              Price formats: "$15" | "$20.50" | "INR 500" | "Rs. 100"
            </p>
          </div>

          {/* Video Upload */}
          <div className="form-group">
            <label className="form-label">Food Video File *</label>
            <input
              type="file"
              className="video-upload"
              accept="video/mp4,video/webm,video/ogg"
              onChange={handleVideoChange}
              required={true}
            />
            {validationErrors.video && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#dc2626",
                  marginTop: "8px",
                  fontSize: "14px",
                }}
              >
                <AlertCircle size={16} />
                {validationErrors.video}
              </div>
            )}
            {validationSuccess.video && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#16a34a",
                  marginTop: "8px",
                  fontSize: "14px",
                }}
              >
                <CheckCircle2 size={16} />
                {validationSuccess.video}
              </div>
            )}
            <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
              Formats: MP4, WebM, OGG | Max size: 50MB
            </p>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={uploading || Object.values(validationErrors).some((v) => v)}
            style={{
              opacity:
                uploading || Object.values(validationErrors).some((v) => v)
                  ? 0.6
                  : 1,
            }}
          >
            {uploading ? (
              <>
                <Loader2Icon className="loader-icon" /> Uploading video, this
                may take few minutes...
              </>
            ) : (
              "Upload Food Video"
            )}
          </button>
        </form>

        <div className="auth-link">
          <button onClick={() => navigate("/")} className="back-btn">
            Back to Feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
