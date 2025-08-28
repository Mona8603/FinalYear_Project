import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import "bootstrap/dist/css/bootstrap.min.css";
import sub1 from "../assets/sub1.png";
import sub3 from "../assets/sub3.png";
import sub from "../assets/sub.png"; // New image added

const SubscriptionPlans = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  // Fetch Subscription Balance
  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in first.");
        navigate("/auth");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/subscription/balance", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setBalance(data.remainingBalance);
          localStorage.setItem("remainingBalance", data.remainingBalance);
        } else {
          alert(data.message || "Failed to fetch balance.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Server error! Please try again later.");
      }
    };

    fetchBalance();
  }, [navigate]);

  // Buy Subscription Function
  const buySubscription = async (amount) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in first.");
      navigate("/auth");
      return;
    }

    // ✅ Prevent subscription purchase if balance is NOT zero
    if (balance > 0) {
      alert("You can only purchase a subscription when your balance is ₹0.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/subscription/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Subscription Purchased Successfully!");
        setBalance(data.newBalance);
        localStorage.setItem("remainingBalance", data.newBalance);
      } else {
        alert(data.message || "Failed to purchase subscription.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Server error! Please try again later.");
    }
  };

  return (
    <motion.div
      className="container mt-5 subscription-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.h2
        className="subscription-heading"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        "Subscription Plans"
      </motion.h2>

      {/* Remaining Balance */}
      <motion.div
        className="alert alert-info text-center balance-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <strong>Remaining Subscription Balance:</strong> ₹{balance}
      </motion.div>

      {/* Subscription Cards */}
      <div className="row justify-content-center">
        {[
          { img: sub, title: "Basic Plan", price: 500 },
          { img: sub3, title: "Standard Plan", price: 1000 },
          { img: sub1, title: "Premium Plan", price: 2000 },
        ].map((plan, index) => (
          <motion.div
            key={index}
            className="col-md-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
          >
            <div className="subscription-card">
              <img src={plan.img} alt={plan.title} className="card-img-top img-fluid card-img" />
              <div className="card-body">
                <h5 className="card-title">{plan.title}</h5>
                <p className="card-text">Get ₹{plan.price} worth of inquiries</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => buySubscription(plan.price)}
                  disabled={balance > 0} // Disable button if balance is not zero
                >
                  Buy for ₹{plan.price}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Styles */}
      <style>
        {`
          .subscription-heading {
            font-size: 2.8rem;
            font-weight: bold;
            color: #002855;
            text-align: center;
            margin-bottom: 30px;
            padding-top: 30px;
          }

          .balance-box {
            font-size: 1.5rem;
            font-weight: bold;
          }

          .subscription-card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            padding: 20px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 320px;
            text-align: center;
          }

          .subscription-card:hover {
            transform: scale(1.03);
            box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
          }

          .card-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px 10px 0 0;
          }

          .card-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #002855;
            margin-top: 15px;
          }

          .card-text {
            font-size: 1.2rem;
            color: #555;
            margin-bottom: 15px;
          }

          @media (max-width: 768px) {
            .subscription-heading {
              font-size: 2.2rem;
            }

            .subscription-card {
              margin-bottom: 20px;
              max-width: 100%;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default SubscriptionPlans;
