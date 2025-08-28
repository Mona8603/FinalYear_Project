import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vendorLoggedIn, setVendorLoggedIn] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setVendorLoggedIn(true);
      setVendorName(localStorage.getItem("vendorName") || "Vendor"); // ✅ Now showing vendor name only
      setProfilePic(localStorage.getItem("profilePic") || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setVendorLoggedIn(false);
    window.location.href = "/"; // Redirect to home after logout
  };

  return (
    <>
      {/* ✅ Main Navbar with Dark Blue Background */}
      <nav className="navbar navbar-expand-md navbar-dark fixed-top shadow" style={{ backgroundColor: "#003366" }}>
        <div className="container-fluid">
          {/* ✅ Logo with White Text & No Color Change on Hover */}
          <Link to="/" className="navbar-brand fw-bold animated-logo">
            HANDYMAN
          </Link>

          {/* ✅ Mobile Menu Button */}
          <button className="navbar-toggler border-0" type="button" onClick={() => setSidebarOpen(true)}>
            <FiMenu className="text-white fs-3" />
          </button>

          {/* ✅ Desktop Navigation */}
          <div className="collapse navbar-collapse d-none d-md-flex justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-light fw-bold">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link text-light fw-bold">Services</Link>
              </li>
              <li className="nav-item">
                <Link to="/client-satisfaction" className="nav-link text-light fw-bold">Client Satisfaction</Link>
              </li>
              <li className="nav-item">
                <Link to="/subscription-plans" className="nav-link text-light fw-bold">Subscription Plans</Link>
              </li>
              <li className="nav-item">
                <Link to="/scraped-data" className="nav-link text-light fw-bold">Scraped Data</Link>
              </li>

              {/* ✅ Hide Register/Login if Vendor is Logged In */}
              {vendorLoggedIn ? (
                <li className="nav-item position-relative">
                  {/* ✅ Vendor Profile Button */}
                  <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                    <img src={profilePic} alt="Vendor" className="profile-pic" />
                  </button>

                  {/* ✅ Vendor Dropdown */}
                  {showDropdown && (
                    <div className="profile-dropdown">
                      <p className="vendor-name">Hi, {vendorName}</p> {/* ✅ Only vendor name shown */}
                      
                      {/* ✅ Profile Button */}
                      <button 
                        className="btn btn-primary w-100 mb-2" 
                        onClick={() => navigate("/vendor-profile")}
                      >
                        Profile
                      </button>

                      {/* ✅ Logout Button */}
                      <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/auth" className="btn btn-warning fw-bold">Register/Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Fullscreen Sidebar with Transparent Black Background */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* ✅ Close Button */}
        <button type="button" className="btn-close btn-close-white fs-3 close-btn" onClick={() => setSidebarOpen(false)}>
          <FiX />
        </button>

        {/* ✅ Sidebar Links */}
        <ul className="list-group mt-5">
          <li className="list-group-item text-center">
            <Link to="/" className="nav-link fw-bold fs-5 text-light py-3" onClick={() => setSidebarOpen(false)}>Home</Link>
          </li>
          <li className="list-group-item text-center">
            <Link to="/services" className="nav-link fw-bold fs-5 text-light py-3" onClick={() => setSidebarOpen(false)}>Services</Link>
          </li>
          <li className="list-group-item text-center">
            <Link to="/client-satisfaction" className="nav-link fw-bold fs-5 text-light py-3" onClick={() => setSidebarOpen(false)}>Client Satisfaction</Link>
          </li>
          <li className="list-group-item text-center">
            <Link to="/subscription-plans" className="nav-link fw-bold fs-5 text-light py-3" onClick={() => setSidebarOpen(false)}>Subscription Plans</Link>
          </li>
          <li className="list-group-item text-center">
            <Link to="/scraped-data" className="nav-link fw-bold fs-5 text-light py-3" onClick={() => setSidebarOpen(false)}>Scraped Data</Link>
          </li>
          {!vendorLoggedIn && (
            <li className="list-group-item text-center">
              <Link to="/auth" className="btn btn-light fw-bold fs-5 w-100 py-3" onClick={() => setSidebarOpen(false)}>Register/Login</Link>
            </li>
          )}
        </ul>
      </div>

      {/* ✅ Custom Styles */}
      <style>
        {`
          .animated-logo {
            font-size: 1.8rem;
            color: white;
            transition: transform 0.3s ease;
          }

          .animated-logo:hover {
            transform: scale(1.1);
            color: white;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: -60%;
            width: 50%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            color: white;
            transition: left 0.3s ease-in-out;
            z-index: 1050;
            padding-top: 20px;
          }

          .sidebar.open {
            left: 0;
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1049;
          }

          .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            cursor: pointer;
          }

          .profile-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
          }

          .profile-pic {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid white;
          }

          .profile-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            background: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            min-width: 200px;
          }

          .vendor-name {
            font-size: 1.1rem;
            font-weight: bold;
            color: #003366;
          }

          .nav-link {
            color: white;
            transition: color 0.3s ease-in-out;
          }

          .nav-link:hover {
            color: #ffc107;
          }
        `}
      </style>
    </>
  );
};

export default Header;
