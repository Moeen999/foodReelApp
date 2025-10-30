import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {ArrowLeft} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const VideoFeed = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/food', {
        withCredentials: true
      });
      console.log("response", response)
      setFoodItems(response.data.foodItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching food items:', error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const itemHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / itemHeight);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < foodItems.length) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const itemHeight = window.innerHeight;
    container.scrollTo({
      top: index * itemHeight,
      behavior: 'smooth'
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.max(0, Math.min(foodItems.length - 1, currentIndex + delta));
    scrollToIndex(newIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      const newIndex = Math.max(0, Math.min(foodItems.length - 1, currentIndex + delta));
      scrollToIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentIndex, foodItems.length]);

  if (loading) {
    return (
      <div className="video-feed-loading">
        <div className="loading-spinner">Loading delicious food videos...</div>
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <div className="video-feed-empty">
        <div className="empty-message">
          <h2>No food videos yet!</h2>
          {auth?.role === 'partner' && (
            <>
              <p>Be the first to share your delicious creations!</p>
              <button className='visit-store-btn'>
                <Link to={"/createfood"}>
                  Upload Now
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="video-feed-container" ref={containerRef} onScroll={handleScroll}>
      {foodItems.map((item) => (
        <div key={item._id} className="video-item">
          <button className='backIcon' onClick={()=>navigate(-1)}>
        <ArrowLeft size={24}/>
      </button>
          <video
            className="video-player"
            src={item.video}
            autoPlay
            muted
            loop
            playsInline
          />
          
          <div className="video-overlay">
            <div className="video-info">
              <div className="food-description">
                <h3 className="food-name">{item.name}</h3>
                <p className="food-desc">
                  {item.description && item.description.length > 100 
                    ? `${item.description.substring(0, 100)}...` 
                    : item.description || 'Delicious food waiting for you!'
                  }
                </p>
              </div>
              
              <button className="visit-store-btn">
                <Link to={"/foodpartener/"+item.foodPartener}>
                Visit Store
                </Link>
              </button>
            </div>
          </div>
          
          <div className="video-indicator">
            {foodItems.map((_, i) => (
              <div
                key={i}
                className={`indicator-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
