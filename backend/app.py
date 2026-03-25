from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Basic health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Quantum Computing API is running"})

# Import and register routes
from api.routes import register_routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)