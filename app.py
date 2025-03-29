from flask import Flask, request, jsonify
import pickle
import numpy as np

# Initialize Flask App
app = Flask(__name__)

# Load ML Models
with open("framingham.pkl", "rb") as f:
    heart_model = pickle.load(f)

with open("diabetes.pkl", "rb") as f:
    diabetes_model = pickle.load(f)

with open("liver.pkl", "rb") as f:
    liver_model = pickle.load(f)

# Homepage Route
@app.route('/')
def home():
    return "Welcome to the Medical Diagnosis API! The backend is running successfully."

# Heart Disease Prediction Endpoint
@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    data = request.json
    features = np.array([data['features']]).reshape(1, -1)
    prediction = heart_model.predict(features)[0]
    return jsonify({"prediction": int(prediction)})

# Diabetes Prediction Endpoint
@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    features = np.array([data['features']]).reshape(1, -1)
    prediction = diabetes_model.predict(features)[0]
    return jsonify({"prediction": int(prediction)})

# Liver Disease Prediction Endpoint
@app.route('/predict_liver', methods=['POST'])
def predict_liver():
    data = request.json
    features = np.array([data['features']]).reshape(1, -1)
    prediction = liver_model.predict(features)[0]
    return jsonify({"prediction": int(prediction)})

# Run the App
if __name__ == '__main__':
    app.run(debug=True)






































