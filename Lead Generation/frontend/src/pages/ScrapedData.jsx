import { useEffect, useState } from "react";

const ScrapedData = () => {
  const [countdown, setCountdown] = useState(5); // Countdown before redirect

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5000/";
    }, 5000); // Redirect after 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="scraped-container">
      <h2 className="scraped-title">Redirecting to Scraped Data...</h2>
      <p className="countdown-text">You will be redirected in <strong>{countdown}</strong> seconds.</p>

      {/* Manual Redirection Button */}
      <a href="http://127.0.0.1:5000/" className="scraped-button">
        Go to Scraped Data Now
      </a>

      <div className="loading-animation"></div>

      <style>
        {`
          .scraped-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 100vh;
            background: #f4f4f4;
            font-family: Arial, sans-serif;
            animation: fadeIn 1s ease-in-out;
          }

          .scraped-title {
            font-size: 2rem;
            color: #333;
            margin-bottom: 10px;
          }

          .countdown-text {
            font-size: 1.2rem;
            color: #555;
            margin-bottom: 20px;
          }

          .scraped-button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 1.2rem;
            color: white;
            background: #007bff;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
          }

          .scraped-button:hover {
            background: #0056b3;
          }

          .loading-animation {
            margin-top: 20px;
            width: 50px;
            height: 50px;
            border: 5px solid #ddd;
            border-top: 5px solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ScrapedData;
