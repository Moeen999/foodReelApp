import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/profile.css";
import { ArrowLeft, Loader2Icon, Trash2Icon } from "lucide-react";
import { toast } from "react-hot-toast";

const FoodPartnerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideoToDelete, setSelectedVideoToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/foodpartener/${id}`,
          { withCredentials: true },
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

  const openConfirmModal = (video) => {
    setSelectedVideoToDelete(video);
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedVideoToDelete(null);
    setIsConfirmOpen(false);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/food/delete/${videoId}`,
        {
          withCredentials: true,
        },
      );
      toast.success(data.message);
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== videoId),
      );
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting video:", error);
    }
  };

  const confirmDeleteVideo = async () => {
    if (!selectedVideoToDelete) return;
    await handleDeleteVideo(selectedVideoToDelete._id);
    closeConfirmModal();
  };

  if (loading)
    return (
      <div className="partner-loading">
        <Loader2Icon size={32} color="#FF685C" />
      </div>
    );
  if (!partner) return <div className="partner-error">Partner not found.</div>;

  return (
    <div className="partner-profile-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={22} /> Back
      </button>

      <div className="partner-header">
        <h2 className="partner-name">
          <span>Contact Name:</span> {partner.contactname || "Unknown Partner"}
        </h2>
        <p className="partner-address">
          <span>Address:</span> {partner.address || "Address not available"}
        </p>

        <p className="partner-phone" onClick={() => window.open(`tel:${partner.phone}`)}>
          <span>Phone: {partner.phone}</span>
        </p>

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
                <Trash2Icon
                  onClick={() => openConfirmModal(item)}
                  className="trashIcon"
                />
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

      {isConfirmOpen && selectedVideoToDelete && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal">
            <h3>Delete video?</h3>
            <p>
              Are you sure you want to delete "{selectedVideoToDelete.name}"?
              This action cannot be undone.
            </p>
            <div className="confirm-modal-actions">
              <button className="cancel-btn" onClick={closeConfirmModal}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDeleteVideo}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPartnerProfile;
