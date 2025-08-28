import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InquiryButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vendorType: "Plumber",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/inquiries/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inquiry Submitted Successfully!");
        setShowForm(false);
        setFormData({ name: "", phone: "", vendorType: "Plumber", message: "" });
      } else {
        alert(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Server error! Please try again later.");
    }
  };

  return (
    <>
      {/* Floating Inquiry Button */}
      <button className="inquiry-button" onClick={() => setShowForm(true)}>
        Inquiry Now
      </button>

      {/* Inquiry Form Modal */}
      {showForm && (
        <div className="inquiry-modal">
          <div className="inquiry-content">
            <h3 className="text-center">Send Inquiry</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="Enter your phone number" 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vendor Type</label>
                <select 
                  name="vendorType" 
                  value={formData.vendorType} 
                  onChange={handleChange} 
                  className="form-select"
                >
                  <option value="Plumber">Plumber</option>
                  <option value="Painter">Painter</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Mechanic">Mechanic</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="Describe your requirement" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit Inquiry</button>
            </form>
            <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>
        {`
          /* Floating Inquiry Button with Animation */
          .inquiry-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg,rgb(4, 24, 45),rgb(8, 68, 132));
            color: white;
            border: none;
            padding: 14px 22px;
            border-radius: 30px;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            animation: floatAnimation 3s infinite ease-in-out;
          }

          .inquiry-button:hover {
            transform: scale(1.15);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            animation: bounce 0.6s ease-in-out;
          }

          @keyframes floatAnimation {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }

          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }

          /* Inquiry Form Modal */
          .inquiry-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease-in-out;
          }

          .inquiry-content {
            background: white;
            padding: 25px;
            border-radius: 12px;
            width: 420px;
            position: relative;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Close Button */
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 22px;
            cursor: pointer;
            color: red;
            transition: transform 0.3s ease-in-out;
          }

          .close-btn:hover {
            transform: scale(1.3);
          }
        `}
      </style>
    </>
  );
};

export default InquiryButton;
