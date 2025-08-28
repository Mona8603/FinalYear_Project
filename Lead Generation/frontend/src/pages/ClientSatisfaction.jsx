import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons
import client1 from "../assets/client1.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";

const ClientSatisfaction = () => {
  // Retrieve feedback from localStorage or set default feedback list
  const storedFeedback = JSON.parse(localStorage.getItem("feedbackList")) || [
    {
      image: client1,
      name: "John Doe",
      rating: 5,
      feedback:
        "Absolutely fantastic service! The team arrived on time and completed the work professionally.",
    },
    {
      image: client2,
      name: "Emily Smith",
      rating: 4.5,
      feedback:
        "From the moment I booked the service, the team kept me informed about every step. Great experience!",
    },
    {
      image: client3,
      name: "Michael Johnson",
      rating: 4,
      feedback:
        "Professional, skilled, and handled everything with great care. Definitely recommended!",
    },
    {
      image: client4,
      name: "Sarah Williams",
      rating: 5,
      feedback:
        "This service was an absolute lifesaver! They provided expert solutions. Highly appreciated!",
    },
  ];

  // State to store feedback
  const [feedbackList, setFeedbackList] = useState(storedFeedback);

  // State for new feedback
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    feedback: "",
    rating: 5,
  });

  // Function to handle rating selection
  const handleRatingSelect = (selectedRating) => {
    setNewFeedback({ ...newFeedback, rating: selectedRating });
  };

  // Function to add feedback
  const handleAddFeedback = () => {
    if (newFeedback.name.trim() === "" || newFeedback.feedback.trim() === "") {
      alert("Please enter your name and feedback before submitting.");
      return;
    }

    const updatedFeedbackList = [
      { ...newFeedback, image: client1 }, // Default image
      ...feedbackList, // Append new feedback at the top
    ];

    setFeedbackList(updatedFeedbackList);
    localStorage.setItem("feedbackList", JSON.stringify(updatedFeedbackList)); // Store in localStorage

    // Reset form
    setNewFeedback({ name: "", feedback: "", rating: 5 });
  };

  // Function to render stars dynamically based on rating
  const renderStars = (rating, isClickable = false) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar
            key={i}
            className={`star full ${isClickable ? "clickable" : ""}`}
            onClick={() => isClickable && handleRatingSelect(i + 1)}
          />
        ))}
        {halfStar && <FaStarHalfAlt className="star half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar
            key={i}
            className={`star empty ${isClickable ? "clickable" : ""}`}
            onClick={() => isClickable && handleRatingSelect(fullStars + 1)}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="client-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.h2
        className="client-heading"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        "Client Feedback"
      </motion.h2>

      {/* Feedback Grid */}
      <motion.div
        className="client-grid"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {feedbackList.map((client, index) => (
          <motion.div
            key={index}
            className="client-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
          >
            {/* Image Section */}
            <div className="client-image-container">
              <img src={client.image} alt={client.name} className="client-image" />
            </div>

            {/* Content Section */}
            <div className="client-text-container">
              <h3 className="client-name">{client.name}</h3>
              {renderStars(client.rating)}
              <p className="client-feedback">{client.feedback}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Feedback Section */}
      <div className="feedback-form-container">
        <h3 className="add-feedback-heading">Add Your Feedback</h3>
        <div className="feedback-form">
          <input
            type="text"
            placeholder="Your Name"
            value={newFeedback.name}
            onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
          />
          <textarea
            placeholder="Your Feedback"
            value={newFeedback.feedback}
            onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
          />
          {renderStars(newFeedback.rating, true)}
          <button className="submit-btn" onClick={handleAddFeedback}>
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .client-section {
            width: 100%;
            min-height: 100vh;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 5vw;
            text-align: center;
          }

          .client-heading {
            font-size: 2.8rem;
            font-weight: bold;
            color: #002855;
            margin-bottom: 40px;
            margin-top: 20px;
          }

          .client-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            max-width: 1200px;
            width: 100%;
          }

          .client-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            color: #333;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }

          .client-image-container {
            width: 90px;
            height: 90px;
            margin: 0 auto 15px;
            border-radius: 50%;
            border: 3px solid #002855;
            overflow: hidden;
          }

          .client-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .feedback-form-container {
            width: 50%;
            background: #f9f9f9;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
            margin-top: 40px;
          }

          input, textarea {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border-radius: 5px;
            border: 2px solid goldenrod;
            font-size: 1rem;
          }

          .submit-btn {
            background: #002855;
            color: white;
            border: none;
            padding: 12px;
            cursor: pointer;
            width: 100%;
          }

          .star {
            font-size: 1.4rem;
            margin: 0 3px;
            cursor: pointer;
            color: goldenrod !important; /* Star color remains golden */
          }
        `}
      </style>
    </motion.div>
  );
};

export default ClientSatisfaction;
