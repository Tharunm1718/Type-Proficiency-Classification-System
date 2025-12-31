import os
from flask import Flask, request, jsonify
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)

app = Flask(__name__)

model = joblib.load(os.path.join(ROOT_DIR, "typing_model.pkl"))
scaler = joblib.load(os.path.join(ROOT_DIR, "scaler.pkl"))
label_encoder = joblib.load(os.path.join(ROOT_DIR, "label_encoder.pkl"))

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()

    features = np.array([
        data["typing_speed"],
        data["avg_key_delay"],
        data["backspace_count"],
        data["pause_count"],
        data["error_rate"],
        data["total_time"]
    ]).reshape(1, -1)

    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)

    label = label_encoder.inverse_transform(prediction)[0]
    return jsonify({"typing_level": label})
