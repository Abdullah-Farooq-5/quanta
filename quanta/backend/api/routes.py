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
        Endpoint to retrieve glossary terms with pagination
        """
        try:
            from utils.db import get_db
            db = get_db()
            
            if db is None:
                return jsonify({"error": "Database connection failed"}), 500
            
            # Pagination parameters
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)
            
            # Calculate skip amount
            skip = (page - 1) * per_page
            
            # Get total count for pagination info
            total_items = db.glossary.count_documents({})
            total_pages = (total_items + per_page - 1) // per_page  # Ceiling division
            
            # Get paginated results sorted alphabetically by term
            terms = list(db.glossary.find({}, {'_id': 0})
                        .sort('term', 1)
                        .skip(skip)
                        .limit(per_page))
            
            return jsonify({
                "success": True,
                "data": terms,
                "pagination": {
                    "total_items": total_items,
                    "total_pages": total_pages,
                    "current_page": page,
                    "per_page": per_page,
                    "has_next": page < total_pages,
                    "has_prev": page > 1
                }
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
            
            if db is None:
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