from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from email.mime.text import MIMEText
import os
import random
import smtplib


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["cookies", "headers"]
app.config["JWT_COOKIE_SECURE"] = False  # True if using HTTPS
app.config["JWT_ACCESS_COOKIE_NAME"] = "token"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False  # For development only

mongo = PyMongo(app)
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

otp_store = {}

def send_otp_email(email, otp):
    # Replace with your SMTP server details
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    msg = MIMEText(f"Your Sentimo OTP is: {otp}")
    msg["Subject"] = "Sentimo Email Verification OTP"
    msg["From"] = smtp_user
    msg["To"] = email

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, [email], msg.as_string())

@app.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

    otp = str(random.randint(100000, 999999))
    otp_store[email] = otp

    try:
        send_otp_email(email, otp)
    except Exception as e:
        return jsonify({"error": "Failed to send OTP"}), 500

    return jsonify({"message": "OTP sent"}), 200

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    otp = data.get("otp")

    if not all([email, username, password, otp]):
        return jsonify({"error": "All fields are required"}), 400

    if otp_store.get(email) != otp:
        return jsonify({"error": "Invalid OTP"}), 400

    user_col = mongo.db.User
    if user_col.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 400
    if user_col.find_one({"username": username}):
        return jsonify({"error": "Username already taken"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    user_col.insert_one({
        "email": email,
        "username": username,
        "password": hashed_pw
    })

    otp_store.pop(email, None)
    return jsonify({"message": "Registration successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    identifier = data.get("identifier")
    password = data.get("password")

    if not identifier or not password:
        return jsonify({"error": "All fields are required"}), 400

    user_col = mongo.db.User
    user = user_col.find_one({
        "$or": [
            {"email": identifier},
            {"username": identifier}
        ]
    })

    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user["_id"]))
    resp = make_response(jsonify({"token": access_token}), 200)
    resp.set_cookie("token", access_token, httponly=True, samesite="Lax")
    return resp

@app.route("/analyze", methods=["POST"])
@jwt_required(optional=True)
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "Text is required"}), 400

    sentiment = "Positive" if "good" in text.lower() else "Negative"

    user_id = get_jwt_identity()
    if user_id:
        mongo.db.Sentiments.insert_one({
            "user_id": user_id,
            "text": text,
            "sentiment": sentiment
        })

    return jsonify({"sentiment": sentiment}), 200

if __name__ == "__main__":
    app.run(debug=True)
