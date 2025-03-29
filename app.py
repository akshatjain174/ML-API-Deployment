from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load models
with open("framingham.pkl", "rb") as f:
    heart_model = pickle.load(f)

with open("diabetes.pkl", "rb") as f:
    diabetes_model = pickle.load(f)

with open("liver.pkl", "rb") as f:
    liver_model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    model_type = data["model"]  # "heart", "diabetes", or "liver"
    features = np.array(data["features"]).reshape(1, -1)

    if model_type == "heart":
        prediction = heart_model.predict(features)
    elif model_type == "diabetes":
        prediction = diabetes_model.predict(features)
    elif model_type == "liver":
        prediction = liver_model.predict(features)
    else:
        return jsonify({"error": "Invalid model type"}), 400

    return jsonify({"prediction": int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
