import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "Plumber", // Default selected role
    profilePic: null,
    previewPic: null, // Image Preview for UI
  });

  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          profilePic: file,
          previewPic: URL.createObjectURL(file), // Show preview in UI
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      let response;
      let data;

      if (isLogin) {
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        data = await response.json();
        console.log("Login Response:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("profilePic", `http://localhost:5000${data.profilePic}` || "");
          localStorage.setItem("vendorName", formData.email);
          localStorage.setItem("vendorRole", data.role);

          console.log("Redirecting to Dashboard...");
          navigate("/vendor-dashboard");
        } else {
          alert("Login failed! Please check credentials.");
        }
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("role", formData.role);
        if (formData.profilePic) {
          formDataToSend.append("profilePic", formData.profilePic);
        }

        response = await fetch(url, {
          method: "POST",
          body: formDataToSend,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        data = await response.json();
        console.log("Registration Response:", data);

        alert("Registration Successful! Click OK to Login.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error: Please check your network or API response.");
    }
  };

  return (
    <motion.div
      className="d-flex align-items-center justify-content-center vh-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="auth-card card p-3 shadow-lg bg-white rounded "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ maxWidth: "400px", width: "100%", marginTop: "70px" }}
      >
        <h2 className="auth-title text-center">{isLogin ? "Vendor Login" : "Vendor Registration"}</h2>

        {/* Profile Picture Upload - Only for Registration */}
        {!isLogin && (
          <div className="d-flex justify-content-center mt-3">
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
            <label htmlFor="profilePic" className="profile-circle">
              <div className="profile-inner-circle">
                {formData.previewPic ? (
                  <img src={formData.previewPic} alt="Profile" className="profile-image" />
                ) : (
                  <span className="upload-icon">+</span>
                )}
              </div>
            </label>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-2">
          {!isLogin && (
            <>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Enter your phone number" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Your Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="form-control" required>
                  <option value="Plumber">Plumber</option>
                  <option value="Painter">Painter</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Mechanic">Mechanic</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-text">
            {isLogin ? "Don't have an account? Register here." : "Already registered? Login here."}
          </span>
        </div>
      </motion.div>

      {/* Styles */}
      <style>
        {`
          .profile-circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #f8f9fa;
            border: 2px dashed #007bff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
          }

          .profile-inner-circle {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: white;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }

          .upload-icon {
            font-size: 24px;
            color: #007bff;
          }

          .toggle-text {
            cursor: pointer;
            color: #007bff;
            text-decoration: underline;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Auth;
