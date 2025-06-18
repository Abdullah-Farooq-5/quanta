from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def init_db():
    """Initialize the database with sample data"""
    try:
        client = MongoClient(os.getenv('MONGO_URI'))
        db = client.quantadb
        
        # Create glossary terms collection
        glossary_terms = [
            {
                "term": "Qubit",
                "definition": "The fundamental unit of quantum information, representing a two-state quantum mechanical system.",
                "examples": ["Electron spin", "Photon polarization"]
            },
            {
                "term": "Superposition",
                "definition": "A principle of quantum mechanics where quantum systems can exist in multiple states simultaneously until measured.",
                "examples": ["Schrödinger's cat thought experiment"]
            },
            {
                "term": "Quantum Gate",
                "definition": "Operations that manipulate quantum states, analogous to classical logic gates.",
                "examples": ["Hadamard gate", "CNOT gate", "Pauli-X gate"]
            }
        ]
        
        # Create quiz questions collection
        quiz_questions = [
            {
                "level": "beginner",
                "question": "What is a qubit?",
                "options": [
                    "A classical bit with extra steps",
                    "The basic unit of quantum information",
                    "A type of quantum processor",
                    "A mathematical equation"
                ],
                "correctAnswer": 1
            },
            {
                "level": "beginner",
                "question": "What does the Hadamard gate do to a |0⟩ state?",
                "options": [
                    "Flips it to |1⟩",
                    "Creates a superposition state",
                    "Measures it",
                    "Nothing"
                ],
                "correctAnswer": 1
            }
        ]
        
        # Drop existing collections and insert new data
        db.glossary.drop()
        db.quizzes.drop()
        
        db.glossary.insert_many(glossary_terms)
        db.quizzes.insert_many(quiz_questions)
        
        print("Database initialized with sample data!")
        
    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == "__main__":
    init_db()