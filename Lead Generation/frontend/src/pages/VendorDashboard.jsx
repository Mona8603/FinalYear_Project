import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [balance, setBalance] = useState(0);
  const [vendorName, setVendorName] = useState(localStorage.getItem("vendorName") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); // Redirect to login if no token found
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/vendor-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setVendorName(data.name);
          localStorage.setItem("vendorName", data.name);
        } else {
          console.error("Error fetching vendor profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/subscription/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setBalance(data.remainingBalance);
          localStorage.setItem("remainingBalance", data.remainingBalance);
        } else {
          console.error("Error fetching balance:", data.message);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/inquiries/vendor-inquiries", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setInquiries(data.inquiries);

          const newInquiriesCount = data.newInquiriesCount || 0;
          if (newInquiriesCount > 0) {
            setBalance(data.remainingBalance);
            localStorage.setItem("remainingBalance", data.remainingBalance);
          }

          localStorage.setItem("previousInquiries", data.inquiries.length);
        } else {
          console.error("Error fetching inquiries:", data.message);
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchVendorProfile();
    fetchBalance();
    fetchInquiries();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Vendor Dashboard Title */}
      <h2 className="dashboard-title">Vendor Dashboard</h2>

      {/* Subscription Balance */}
      <div className="balance-card">
        <p>
          Remaining Subscription Balance: <strong>₹{balance}</strong>
        </p>
      </div>

      {/* Inquiries Table */}
      <div className="inquiry-container">
        <h3 className="table-title">Received Inquiries</h3>
        {balance <= 0 ? (
          <p className="text-danger text-center">
            Your subscription balance is ₹0. Please recharge to receive new inquiries.
          </p>
        ) : (
          <table className="table table-bordered text-center">
            <thead className="table">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry, index) => (
                  <tr key={index}>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.phone}</td>
                    <td>{inquiry.message}</td>
                    <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No inquiries yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Styles */}
      <style>
        {`
          .dashboard-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: white;
          }

          /* Centered Dashboard Title */
          .dashboard-title {
            font-size: 3rem;
            font-weight: bold;
            color: #003366;
            text-align: center;
            margin-top: 50px;
          }

          .balance-card {
            background: #dff6ff;
            padding: 15px;
            border-radius: 8px;
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            margin: 20px auto;
            max-width: 400px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
          }

          .inquiry-container {
            width: 90%;
            max-width: 1000px;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }

          .table-title {
            background: #007bff;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
          }

          .text-danger {
            font-size: 1.2rem;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default VendorDashboard;
