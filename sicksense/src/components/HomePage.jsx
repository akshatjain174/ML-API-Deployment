import { Link } from "react-router-dom";
import "../styles.css";

function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">Welcome to SickSense</h1>
        <p className="hero-subtitle">
          Your AI-powered medical diagnosis assistant.
        </p>
      </header>

      {/* Disease Information Section */}
      <div className="disease-section">
        <h2 className="section-title">Select a Disease for Diagnosis</h2>
        <div className="disease-cards">
          <div className="card heart">
            <h3>❤️ Heart Disease</h3>
            <p>Predict the likelihood of heart-related conditions.</p>
            <Link to="/predict/heart" className="diagnose-btn">Check Diagnosis</Link>
          </div>

          <div className="card diabetes">
            <h3>🩸 Diabetes</h3>
            <p>Analyze factors contributing to diabetes.</p>
            <Link to="/predict/diabetes" className="diagnose-btn">Check Diagnosis</Link>
          </div>

          <div className="card liver">
            <h3>🫁 Liver Disease</h3>
            <p>Evaluate liver health based on medical data.</p>
            <Link to="/predict/liver" className="diagnose-btn">Check Diagnosis</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
