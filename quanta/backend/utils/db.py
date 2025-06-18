from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_db():
    """Get a connection to the MongoDB database"""
    try:
        client = MongoClient(os.getenv('MONGO_URI'))
        db = client.quantadb
        # Test connection
        client.server_info()
        return db
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None