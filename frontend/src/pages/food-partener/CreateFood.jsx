import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const CreateFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    video: null
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodData(prev => ({
        ...prev,
        video: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodData.video) {
      alert('Please select a video file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', foodData.video);
      formData.append('name', foodData.name);
      formData.append('description', foodData.description);

      await axios.post('http://localhost:3000/api/food', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      alert('Food video uploaded successfully!');
      setFoodData({ name: '', description: '', video: null });
      navigate('/');
    } catch (error) {
      console.error('Error uploading food video:', error);
      alert('Error uploading video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Upload a Food Item</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Food Item</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter food name"
              name="name"
              value={foodData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              placeholder="Describe your delicious food..."
              name="description"
              value={foodData.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Video File</label>
            <input
              type="file"
              className="form-input"
              accept="video/*"
              onChange={handleVideoChange}
              required
            />
            {foodData.video && (
              <p className="file-info">
                Selected: {foodData.video.name}
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={uploading}
          >
            {uploading ? 'Please wait this may take few minutes.....' : 'Upload Food Video'}
          </button>
        </form>
        
        <div className="auth-link">
          <button 
            onClick={() => navigate('/')}
            className="back-btn"
          >
            Back to Feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;