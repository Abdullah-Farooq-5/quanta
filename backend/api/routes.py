from flask import jsonify, request
from services.quanta_service import create_circuit, run_simulation

def register_routes(app):
    """
    Register all API routes for the application
    """
    
    @app.route('/', methods=['GET'])
    def index():
        """
        Root endpoint
        """
        return jsonify({
            "message": "Welcome to Quantum Computing API",
            "status": "online",
            "endpoints": [
                "/api/health",
                "/api/simulate",
                "/api/glossary",
                "/api/quizzes"
            ]
        })
    
    @app.route('/api/simulate', methods=['POST'])
    def simulate():
        """
        Endpoint for simulating quantum circuits
        """
        try:
            circuit_data = request.json
            if not circuit_data:
                return jsonify({"error": "No circuit data provided"}), 400
            
            # Create and simulate quantum circuit
            circuit = create_circuit(circuit_data)
            result = run_simulation(circuit)
            
            return jsonify({
                "success": True,
                "data": result
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    @app.route('/api/glossary', methods=['GET'])
    def get_glossary():
        """
        Endpoint to retrieve glossary terms
        """
        try:
            from utils.db import get_db
            db = get_db()
            
            # Changed this line - don't evaluate db as boolean
            if db is None:  # Use 'is None' instead of just 'if db:'
                return jsonify({"error": "Database connection failed"}), 500
                
            terms = list(db.glossary.find({}, {'_id': 0}))
            return jsonify({
                "success": True,
                "data": terms
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    @app.route('/api/quiz', methods=['GET'])
    def get_quizzes():
        """
        Endpoint to retrieve quiz questions
        """
        try:
            from utils.db import get_db
            db = get_db()
            
            # Changed this line too
            if db is None:  # Use 'is None' instead of just 'if db:'
                return jsonify({"error": "Database connection failed"}), 500
                
            level = request.args.get('level', 'all')
            
            # Filter by level if specified
            filter_query = {} if level == 'all' else {'level': level}
            questions = list(db.quizzes.find(filter_query, {'_id': 0}))
            
            return jsonify({
                "success": True,
                "data": questions
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500