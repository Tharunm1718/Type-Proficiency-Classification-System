from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("typing_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoder = joblib.load("label_encoder.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = [
        data["typing_speed"],
        data["avg_key_delay"],
        data["backspace_count"],
        data["pause_count"],
        data["error_rate"],
        data["total_time"]
    ]

    features = np.array(features).reshape(1, -1)
    features_scaled = scaler.transform(features)

    prediction = model.predict(features_scaled)
    predicted_label = label_encoder.inverse_transform(prediction)[0]

    return jsonify({
        "typing_level": predicted_label
    })