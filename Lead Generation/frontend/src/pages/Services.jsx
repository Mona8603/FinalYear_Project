import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import image1 from "../assets/image1.png"; // Mechanical
import image2 from "../assets/image2.png"; // Plumber
import image3 from "../assets/image3.png"; // Painter
import image4 from "../assets/image4.png"; // Electrician
import image5 from "../assets/image5.png"; // Carpenter
import image6 from "../assets/image6.png"; // Worker

const Services = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <motion.div
      className="container-fluid services-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Services Heading */}
      <h2 className="services-heading">"Our Services"</h2>

      {/* Services Grid - 3 Cards Per Row with Space Between Rows */}
      <div className="container">
        <div className="row justify-content-center">
          {/* First Row */}
          <motion.div
            className="col-md-4 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="service-card">
              <img src={image1} alt="Mechanical" className="service-image" />
              <h3 className="service-title">Mechanical Services</h3>
              <p className="service-description">
                Our expert mechanical services ensure that your machinery and equipment function smoothly. We specialize in maintenance, troubleshooting, and repairs for industrial and home-use machines.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="col-md-4 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="service-card">
              <img src={image2} alt="Plumber" className="service-image" />
              <h3 className="service-title">Plumbing Services</h3>
              <p className="service-description">
                We offer professional plumbing solutions, including leak detection, pipe installations, and drainage repairs. Our certified plumbers ensure your water systems function flawlessly.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="col-md-4 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="service-card">
              <img src={image3} alt="Painter" className="service-image" />
              <h3 className="service-title">Painting Services</h3>
              <p className="service-description">
                Our high-quality painting services include interior and exterior painting, wallpapering, and decorative finishes. We use premium paints and techniques for lasting beauty.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Space Between Rows */}
        <div className="row-space"></div>

        {/* Second Row */}
        <div className="row justify-content-center">
          <motion.div
            className="col-md-4 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="service-card">
              <img src={image4} alt="Electrician" className="service-image" />
              <h3 className="service-title">Electrical Repairs</h3>
              <p className="service-description">
                We provide safe and efficient electrical repairs, wiring, and installations. Whether fixing power outages or installing new sockets, our licensed electricians guarantee precision and safety.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="col-md-4 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="service-card">
              <img src={image5} alt="Carpenter" className="service-image" />
              <h3 className="service-title">Carpentry Services</h3>
              <p className="service-description">
                Our expert carpentry services cover custom furniture, cabinetry, flooring, and home renovations. We ensure every piece is crafted with precision and elegance.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="col-md-4 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="service-card">
              <img src={image6} alt="Worker" className="service-image" />
              <h3 className="service-title">General Labor</h3>
              <p className="service-description">
                From household maintenance to commercial labor, we provide skilled workers for all types of tasks, ensuring efficiency and productivity in every job.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .services-section {
            padding: 60px 5vw;
            background: #f8f9fa;
            text-align: center;
          }

          .services-heading {
            font-size: 3rem;
            font-weight: bold;
            color: #003366;
            animation: fadeEffect 3s infinite alternate;
            margin-bottom: 30px;
            margin-top: 3%;
          }

          @keyframes fadeEffect {
            0% { opacity: 1; }
            100% { opacity: 0.8; }
          }

          .service-card {
            background: white;
            padding: 20px;
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            text-align: center;
          }

          .service-card:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          }

          .service-image {
            max-width: 100%;
            height: 220px;
            border-radius: 10px;
            object-fit: cover;
            margin-bottom: 20px;
          }

          .service-title {
            font-size: 1.8rem;
            font-weight: bold;
            color: #003366;
            margin-bottom: 10px;
          }

          .service-description {
            font-size: 1.2rem;
            color: #555;
            text-align: justify;
            padding: 0 10px;
          }

          .row-space {
            height: 50px;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Services;
