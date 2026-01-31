import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";
import { getAllReviews } from "../api/reviewApi";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
      setReviews(res.data || []);
    } catch {
      toast.error("Unable to load reviews");
    }
  };

  const handleAddReview = () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      toast.warn("Please login to add a review");
      navigate("/login");
    } else {
      navigate("/customer/addreview");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="reviews-page">
        <div className="reviews-header">
          <h2 className="reviews-heading">What Customers Say</h2>

          <button className="review-add-btn" onClick={handleAddReview}>
            <BsPlusCircleFill size={18} />
            <span>Add Review</span>
          </button>
        </div>

        {reviews.length ? (
          <div className="review-grid">
            {reviews.map((review) => (
              <div key={review.feedbackId} className="review-card">
                <div className="review-card-header">
                  <h5>{review.userName}</h5>
                  <span className="verified-badge">Verified</span>
                </div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first!</p>
        )}
      </div>
    </>
  );
}

export default Reviews;
