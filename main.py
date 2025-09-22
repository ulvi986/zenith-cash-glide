#region libraries
from flask import Flask, jsonify, request,send_file
import pyttsx3
from flask_cors import CORS
from microservices.signup import register_user
from microservices.getdbconnection import get_db_connection
import logging
import time
import speech_recognition as sr
import gtts as  gTTS
import io
import pygame
from pydub import AudioSegment
import tempfile
import speech_recognition as sr
from gtts import gTTS
import io
import tempfile
import soundfile as sf
import numpy as np
import os
#endregion



#region debugging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

#endregion




#region Cors for all ports
app = Flask(__name__)
app.secret_key = 'Experiment_Reforger'

# CORS konfiqurasiyası
CORS(app, 
     origins=["http://localhost:8080"], 
     supports_credentials=True,
     allow_headers=["Content-Type"],
     methods=["POST", "OPTIONS"])

#endregion

myglobaluserid =  None
myglobalgmail = None
myglobalCartBalance = None


#region signup
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"message": "No data provided"}), 400
        
        fullName = data.get("fullName")
        email = data.get("email")
        password = data.get("password")
        
        # Validation
        if not fullName or not email or not password:
            return jsonify({"message": "All fields are required"}), 400
        

        conn = get_db_connection()
        


        if not conn:
            return "Database connection error", 500
        try:
            fullName = data.get("fullName")
            email = data.get("email")
            password = data.get("password")

            register_user(conn, fullName, email, password)
            cur = conn.cursor()
            cur.execute("SELECT user_id  FROM signup_login_system WHERE gmail = %s", (email,))
            userid = cur.fetchone()
            global myglobaluserid
            myglobaluserid = userid[0]
            global myglobalgmail   
            myglobalgmail = email
            return jsonify({"message": "User registered successfully"}), 201
        except Exception as e:
            logger.error(f"Registration failed: {e}")
            return "Registration failed", 500
        finally:
            conn.close()

        
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Server error occurred"}), 500

#endregion

#region login
@app.route("/login", methods=["GET","POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No data provided"}), 400
    
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection error"}), 500

    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT gmail, password FROM signup_login_system WHERE gmail = %s",
            (email,)
        )
        row = cur.fetchone()
        cur.close()
        conn.close()
        print(row)

        if row is None:
            return jsonify({"message": "User not found"}), 404

        db_email, db_password = row
        if password == db_password:
            return jsonify({
                "status": "success",
                "message": "Login successful",
                "email": db_email
            }), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Invalid password"
            }), 401

    except Exception as e:
        logger.error(f"Login failed: {e}")
        return jsonify({"message": "Login failed"}), 500

#endregion

#region informationaboutuser
@app.route("/api/informationaboutuser", methods=["GET"])
def informationaboutuser():
    email = request.args.get("email")  # GET query param
    if not email:
        return jsonify({"message": "No email provided"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection error"}), 500

    try:
        cur = conn.cursor()
        cur.execute("SELECT cartbalance FROM budge WHERE gmail = %s", (email,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        total_revenue = str(row[0]) if row and row[0] else "0.00"
        global myglobalCartBalance
        myglobalCartBalance = total_revenue
        return jsonify({"total_revenue": total_revenue}), 200
    except Exception as e:
        logger.error(f"Fetching user info failed: {e}")
        return jsonify({"message": "Fetching user info failed"}), 500

#endregion

#region totaltransactions (error here)
@app.route("/api/totaltransactions", methods=["GET","POST"])
def totaltransactions():
    email  = request.args.get("email")  # GET query param
    if not email:
        return jsonify({"message": "No email provided"}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection error"}), 500
    
    try:
        cur = conn.cursor()
        cur.execute("""
    SELECT COUNT(p.user_id) AS total_transactions,
           SUM(p.amount) AS total_amount
    FROM payments p
    JOIN signup_login_system s ON p.user_id = s.user_id
    WHERE s.gmail = %s
""", (email,))

        row = cur.fetchone()
        cur.close()
        conn.close()
        print(row)
        totaltransactions = row[0] if row and row[0] else 0
        print(totaltransactions)
        print(type(totaltransactions))
        return jsonify({"totaltransactions": totaltransactions}), 200
    except Exception as e:
        logger.error(f"Fetching total transactions failed: {e}")
        return jsonify({"message": "Fetching total transactions failed"}), 500


#endregion

@app.route("/api/voicechatbot", methods=["POST"])
def voicechatbot():
    try:
        # 1️⃣ Frontend-dən audio gəlməyibsə
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file sent"}), 400

        audio_file = request.files['audio']

        # 2️⃣ WebM → WAV çevirmə
        with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as temp_webm:
            audio_file.save(temp_webm.name)
            temp_webm.flush()

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_wav:
            audio = AudioSegment.from_file(temp_webm.name)
            audio.export(temp_wav.name, format="wav")

        # 3️⃣ Speech recognition
        recognizer = sr.Recognizer()
        with sr.AudioFile(temp_wav.name) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data, language="en-GB")

        print(f"Tanınan mətn: {text}")

        # 4️⃣ Cavab (pyttsx3 offline)
        if any(cmd in text.lower() for cmd in ["balance", "say balance", "show balance"]):
            engine = pyttsx3.init()
            engine.say("1234 azerbaijan manats")
            engine.runAndWait()

        # 5️⃣ JSON cavab frontend üçün
        return jsonify({"recognized_text": text}), 200

    except sr.UnknownValueError:
        return jsonify({"error": "Audio not understood"}), 400
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
#endregion
if __name__ == "__main__":
    app.run(debug=True, port=5000)
