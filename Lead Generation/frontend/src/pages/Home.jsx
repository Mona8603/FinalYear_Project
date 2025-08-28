import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import homeImage from "../assets/Home.png";
import home1 from "../assets/Home1.png";
import home2 from "../assets/Home2.png";
import home3 from "../assets/Home3.jpg";

const Home = () => {
  const [animate, setAnimate] = useState(false);
  const achievementsRef = useRef(null);
  const imagesRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Counter States
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    if (imagesRef.current) {
      observer.observe(imagesRef.current);
    }

    return () => {
      if (achievementsRef.current) {
        observer.unobserve(achievementsRef.current);
      }
      if (imagesRef.current) {
        observer.unobserve(imagesRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCounter = (setCount, maxValue) => {
        let count = 0;
        const interval = setInterval(() => {
          count += Math.ceil(maxValue / 50);
          if (count >= maxValue) {
            count = maxValue;
            clearInterval(interval);
          }
          setCount(count);
        }, 50);
      };

      animateCounter(setCount1, 5000);
      animateCounter(setCount2, 3500);
      animateCounter(setCount3, 2000);
    }
  }, [isVisible]);

  return (
    <div className="home-scroll-container">
      {/* 🌟 Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className={`hero-heading ${animate ? "fade-in-text" : ""}`}>
            "Your Trusted Handyman"
          </h1>
          <p className="hero-subtext">
            Fast, reliable, and affordable home services designed for your convenience.
          </p>
          <p className="hero-extra-text">
            We provide a wide range of high-quality home repair and improvement services.  
            Whether it's plumbing, electrical work, painting, or renovations, our skilled professionals  
            ensure hassle-free and top-notch solutions at affordable prices.
          </p>
        </div>
        <div className="hero-image">
          <img src={home3} alt="Home3" className="parallax-image" />
        </div>
      </div>

      {/* 🔥 Achievements Section */}
      <div ref={achievementsRef} className="achievements-section">
        <h2 className="section-heading">"Our Achievements"</h2>
        <div className="counter-container">
          <div className="counter-card">
            <h3 className="counter">{count1}+</h3>
            <p>Completed Projects</p>
          </div>
          <div className="counter-card">
            <h3 className="counter">{count2}+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="counter-card">
            <h3 className="counter">{count3}+</h3>
            <p>Professional Experts</p>
          </div>
        </div>
      </div>

      {/* 🎨 Our Work Portfolio Section */}
      <div ref={imagesRef} className="gallery-section">
        <h2 className="section-heading">"Our Work Portfolio"</h2>
        <div className="image-gallery">
          <div className="gallery-item">
            <img src={home1} alt="Project 1" className="gallery-img" />
          </div>

          <div className="gallery-item">
            <img src={home2} alt="Project 2" className="gallery-img" />
          </div>

          <div className="gallery-item">
            <img src={homeImage} alt="Project 3" className="gallery-img" />
          </div>
        </div>

        <p className="gallery-description">
          <strong>
            <span className="highlight-text">Our projects range from simple repairs to complex home renovations.</span>  
            <br />
            <span className="highlight-text">With trusted professionals, we ensure high-quality services that meet your needs.</span>
          </strong>
        </p>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          /* Smooth scrolling */
          .home-scroll-container {
            overflow-y: scroll;
            scroll-behavior: smooth;
            height: 100vh;
          }

          /* Hero Section */
          .hero-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100vh;
            text-align: left;
            padding: 50px;
            background: linear-gradient(to right, #E3F2FD,rgb(214, 222, 228));
            color: #003366;
          }

          .hero-content {
            max-width: 600px;
          }

          .hero-heading {
            font-size: 3.5rem;
            font-weight: bold;
            white-space: nowrap;
            color: #003366;
          }

          .hero-subtext {
            font-size: 1.5rem;
            white-space: nowrap;
            color: #003366;
          }

          .hero-extra-text {
            font-size: 1.2rem;
            font-weight: bold;
            color: #003366;
            animation: fadeInText 2s ease-in-out;
          }

          .parallax-image {
            width: 650px;
            height: 500px;
            border-radius: 15px;
            transition: transform 1.5s ease-in-out;
            margin-top: 10%;
            margin-left: 5%;
          }

          /* Centered Section Headings */
          .section-heading {
            font-size: 2.8rem;
            font-weight: bold;
            color: #003366;
            text-align: center;
            margin-bottom: 40px;
          }

          /* Achievements Section */
          .achievements-section {
            text-align: center;
            padding: 80px 0;
            background: white;
          }

          .counter-container {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }

          .counter-card {
            background: white;
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 30%;
            transition: transform 0.3s ease-in-out;
          }

          .counter-card:hover {
            transform: scale(1.1);
          }

          /* Image Gallery */
          .image-gallery {
            display: flex;
            gap: 20px;
            justify-content: center;
            padding: 50px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .gallery-item {
            overflow: hidden;
            border-radius: 10px;
            width: 30%;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease-in-out;
          }

          .gallery-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
          }

          /* Centered Text with Bold Dark Blue */
          .gallery-description {
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: #003366;
            margin-top: 30px;
          }

          @keyframes fadeInText {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
