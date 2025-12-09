import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/profile.css";
import { ArrowLeft } from "lucide-react";

const FoodPartnerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/foodpartener/${id}`,
          { withCredentials: true }
        );

        const { fp, foodItems } = response.data;
        setPartner(fp || {});
        setVideos(foodItems || []);
      } catch (error) {
        console.error("Error fetching partner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, [id]);

  if (loading) return <div className="partner-loading">Loading profile...</div>;
  if (!partner) return <div className="partner-error">Partner not found.</div>;

  return (
    <div className="partner-profile-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={22} /> Back
      </button>

      <div className="partner-header">
        {/* <img
          src={partner.profilePicture || "/default-avatar.jpg"}
          alt={partner.bussinessname}
          className="partner-avatar"
        /> */}

        <h2 className="partner-name">{partner.contactname || "Unknown Partner"}</h2>
        <p className="partner-address">{partner.address || "Address not available"}</p>

        <div className="partner-stats">
          <div>
            <h3>{videos.length}</h3>
            <p className="uploadedVideos">Uploaded Videos</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="partner-videos">
        <h3 className="video-section-title">Uploaded Food Reels</h3>
        {videos.length === 0 ? (
          <p className="no-videos">No videos uploaded yet.</p>
        ) : (
          <div className="video-grid">
            {videos?.map((item) => (
              <div key={item._id} className="video-card">
                <video
                  src={item.video}
                  loop
                  playsInline
                  controls
                  className="partner-video"
                />
                <div className="video-info">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPartnerProfile;
