from flask import Flask, request, jsonify, send_from_directory
import pickle
import numpy as np
import os

app = Flask(__name__, static_folder="build", static_url_path="")

# Load ML Models
models = {
    "heart": pickle.load(open("framingham.pkl", "rb")),
    "diabetes": pickle.load(open("diabetes.pkl", "rb")),
    "liver": pickle.load(open("liver.pkl", "rb")),
}

# Serve React Frontend
@app.route("/")
def serve_react():
    return send_from_directory("build", "index.html")

@app.route("/<path:path>")
def serve_static_files(path):
    return send_from_directory("build", path)

# API Endpoint for Predictions
@app.route("/predict_<disease>", methods=["POST"])
def predict(disease):
    try:
        data = request.json
        features = [float(value) for value in data["features"]]

        model = models.get(disease)
        if not model:
            return jsonify({"error": "Invalid disease type"}), 400

        prediction = model.predict(np.array([features]))[0]
        return jsonify({"prediction": int(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)































