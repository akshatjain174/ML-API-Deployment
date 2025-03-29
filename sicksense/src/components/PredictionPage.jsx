import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles.css";

function PredictionPage() {
  const { type } = useParams();
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const fields = {
    heart: ["male", "age", "education", "currentSmoker", "cigsPerDay", "BPMeds", "prevalentStroke", "prevalentHyp", "diabetes", "totChol", "sysBP", "diaBP", "BMI", "heartRate", "glucose"],
    diabetes: ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"],
    liver: ["Age", "Gender", "Total_Bilirubin", "Direct_Bilirubin", "Alkaline_Phosphotase", "Alamine_Aminotransferase", "Aspartate_Aminotransferase", "Total_Proteins", "Albumin", "Albumin_and_Globulin_Ratio"]
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`https://ml-api-service.onrender.com/predict_${type}`, {
        features: Object.values(formData).map(Number),
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error predicting:", error);
    }
  };

  return (
    <div className="prediction-container">
      <h2 className="heading">{type.toUpperCase()} Diagnosis</h2>
      <p className="subtext">Enter the required medical details for prediction.</p>

      <div className="disease-info">
        <h3>About {type.toUpperCase()} Disease</h3>
        <p>Details about the disease, its causes, and precautions.</p>
      </div>

      <div className="input-form">
        {fields[type]?.map((field, index) => (
          <div key={index}>
            <label>{field}</label>
            <input
              type="text"
              name={field}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
      </div>

      <button className="predict-button" onClick={handleSubmit}>Predict</button>
      {result !== null && <p className="result">Prediction: {result}</p>}
    </div>
  );
}

export default PredictionPage;
