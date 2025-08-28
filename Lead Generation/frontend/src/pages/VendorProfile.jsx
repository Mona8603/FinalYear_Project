import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth"); // Redirect to login if no token found
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/vendor-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setVendor(data);
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching vendor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      {loading ? (
        <div className="text-white fw-bold fs-3">Loading...</div>
      ) : vendor ? (
        <div className="card text-center shadow-lg p-4" style={{ width: "350px", borderRadius: "10px", background: "white" }}>
          <img
            src={vendor.profilePic ? `http://localhost:5000${vendor.profilePic}` : "/default-profile.png"}
            alt="Vendor Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover", borderWidth: "4px" }}
          />
          <h2 className="mt-3 text-dark">{vendor.name}</h2>
          <p className="text-primary fw-bold">{vendor.role}</p>
          <p className="text-muted">📧 {vendor.email}</p>
          <p className="text-muted">📞 {vendor.phone}</p>
          <p className="fw-bold text-success">💰 Subscription Balance: ₹{vendor.subscriptionBalance}</p>
          <button className="btn btn-secondary mt-3" onClick={() => navigate("/vendor-dashboard")}>Back to Dashboard</button>
        </div>
      ) : (
        <p className="text-danger fw-bold fs-4">Failed to load profile. Please try again.</p>
      )}
    </div>
  );
};

export default VendorProfile;
