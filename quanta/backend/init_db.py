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
            # Existing items...
            {
                "term": "Quantum Computing",
                "definition": "Uses quantum bits to process information in fundamentally different ways from classical computing.",
                "examples": ["Solving complex optimization or encryption problems faster than classical computers"]
            },
            {
                "term": "Qubit",
                "definition": "Can be 0, 1, or both (superposition).",
                "examples": ["A single electron's spin up/down used as a qubit"]
            },
            {
                "term": "Superposition",
                "definition": "A qubit is in a mix of 0 and 1 until measured.",
                "examples": ["After a Hadamard gate, a |0⟩ becomes (|0⟩ + |1⟩)/√2"]
            },
            {
                "term": "Entanglement",
                "definition": "Qubits become linked—changing one affects the other.",
                "examples": ["In a Bell state, measuring one qubit as 0 instantly determines the other is 1"]
            },
            {
                "term": "Quantum Interference",
                "definition": "Allows some probabilities to be amplified, others canceled.",
                "examples": ["Used in Grover's algorithm to find the correct answer faster"]
            },
            {
                "term": "Measurement",
                "definition": "Observing a qubit forces it into 0 or 1.",
                "examples": ["If qubit is (|0⟩ + |1⟩)/√2, measuring it yields 0 or 1 with 50% chance"]
            },
            {
                "term": "Quantum State",
                "definition": "Mathematical representation of a qubit.",
                "examples": ["|ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1"]
            },
            {
                "term": "Wavefunction",
                "definition": "Describes all possible states of a quantum system.",
                "examples": ["A two-qubit wavefunction might be ψ = 1/√2 (|00⟩ + |11⟩)"]
            },
            {
                "term": "Hilbert Space",
                "definition": "Vector space for quantum states.",
                "examples": ["A single qubit lives in a 2D Hilbert space; 2 qubits live in 4D"]
            },
            {
                "term": "Bra-Ket Notation",
                "definition": "A shorthand for quantum states.",
                "examples": ["⟨ψ|ϕ⟩ is the inner product (overlap) of two states"]
            },
            {
                "term": "Tensor Product",
                "definition": "Combines quantum states.",
                "examples": ["|0⟩ ⊗ |1⟩ = |01⟩ for two qubits"]
            },
            {
                "term": "Quantum Amplitude",
                "definition": "Complex numbers describing probability.",
                "examples": ["In state α|0⟩ + β|1⟩, the probability of 1 is |β|²"]
            },
            {
                "term": "Quantum Gate",
                "definition": "Operation that changes a qubit's state.",
                "examples": ["Hadamard gate creates superposition from |0⟩"]
            },
            {
                "term": "Hadamard Gate (H)",
                "definition": "Turns |0⟩ into (|0⟩ + |1⟩)/√2.",
                "examples": ["Used at the start of many quantum algorithms"]
            },
            {
                "term": "Pauli Gates (X, Y, Z)",
                "definition": "X flips state, Y rotates, Z adds phase.",
                "examples": ["X|0⟩ = |1⟩"]
            },
            {
                "term": "CNOT Gate",
                "definition": "A controlled-NOT gate; flips the target qubit if control is 1.",
                "examples": ["Input |10⟩ → output |11⟩"]
            },
            {
                "term": "T Gate",
                "definition": "Adds a π/4 phase.",
                "examples": ["T|1⟩ = e^(iπ/4)|1⟩"]
            },
            {
                "term": "Quantum Circuit",
                "definition": "Series of gates on qubits.",
                "examples": ["Grover's algorithm is implemented via a quantum circuit of Hadamard, Oracle, and diffusion operators"]
            },
            {
                "term": "Shor's Algorithm",
                "definition": "Efficiently factors large numbers.",
                "examples": ["Can break RSA encryption"]
            },
            {
                "term": "Grover's Algorithm",
                "definition": "Speeds up unstructured search (√N time).",
                "examples": ["Find a single marked item in an unsorted database of a million entries using ~1000 queries instead of a million"]
            },
            {
                "term": "Quantum Fourier Transform (QFT)",
                "definition": "Quantum version of the Fourier transform.",
                "examples": ["A core part of Shor's algorithm"]
            },
            {
                "term": "Amplitude Amplification",
                "definition": "Increases likelihood of the correct answer.",
                "examples": ["Repeated in Grover's algorithm to strengthen correct outcomes"]
            },
            {
                "term": "Quantum Processor",
                "definition": "Runs quantum operations physically.",
                "examples": ["IBM's Eagle chip, a 127-qubit processor"]
            },
            {
                "term": "Superconducting Qubits",
                "definition": "Qubits made with superconductors at cryogenic temperatures.",
                "examples": ["Used in IBM and Google quantum computers"]
            },
            {
                "term": "Trapped Ions",
                "definition": "Use individual ions in electromagnetic traps.",
                "examples": ["IonQ uses this method"]
            },
            {
                "term": "Topological Qubits",
                "definition": "Use exotic states of matter, theoretically less error-prone.",
                "examples": ["Under development by Microsoft"]
            },
            {
                "term": "Qubit Coherence Time",
                "definition": "How long a qubit can stay in superposition.",
                "examples": ["A superconducting qubit might last ~100 µs"]
            },
            {
                "term": "Quantum Decoherence",
                "definition": "Loss of quantum state due to environment.",
                "examples": ["Qubit collapsing due to stray electromagnetic interference"]
            },
            {
                "term": "Cryostat",
                "definition": "Keeps quantum chips cold (~10–15 mK).",
                "examples": ["Dilution refrigerators used for superconducting qubits"]
            },
            {
                "term": "Quantum Error Correction (QEC)",
                "definition": "Protects qubits using redundancy.",
                "examples": ["The 9-qubit Shor code"]
            },
            {
                "term": "Qubit Fidelity",
                "definition": "Accuracy of quantum operations.",
                "examples": ["99.9% fidelity means 1 error per 1,000 operations"]
            },
            {
                "term": "Quantum Noise",
                "definition": "Random fluctuations causing decoherence or gate errors.",
                "examples": ["Crosstalk between qubits"]
            },
            {
                "term": "Logical Qubit",
                "definition": "Encoded qubit made of many physical qubits.",
                "examples": ["1 logical qubit may require 1000 physical qubits for fault-tolerance"]
            },
            {
                "term": "Qiskit",
                "definition": "Python framework for quantum programming by IBM.",
                "examples": ["Write a 2-qubit Bell state circuit in Qiskit"]
            },
            {
                "term": "Cirq",
                "definition": "Google's Python library for quantum circuits.",
                "examples": ["Use Cirq to run algorithms on Google Sycamore"]
            },
            {
                "term": "Quantum Simulator",
                "definition": "Simulates quantum behavior on classical computers.",
                "examples": ["Qiskit Aer backend simulates up to 20–30 qubits"]
            },
            {
                "term": "Quantum Assembly Language (QASM)",
                "definition": "Low-level language to define quantum gates.",
                "examples": ["OPENQASM 2.0; qreg q[2]; h q[0]; cx q[0], q[1];"]
            },
            {
                "term": "Quantum Cloud Computing",
                "definition": "Access quantum processors online.",
                "examples": ["IBM Quantum Experience or Amazon Braket"]
            },
            {
                "term": "Quantum Supremacy",
                "definition": "When a quantum computer outperforms classical.",
                "examples": ["Google claimed this in 2019 with their Sycamore processor"]
            },
            {
                "term": "No-Cloning Theorem",
                "definition": "You can't copy unknown quantum states.",
                "examples": ["Prevents classical-style memory backup"]
            },
            {
                "term": "Adiabatic Quantum Computing",
                "definition": "Solves problems by slowly evolving a system.",
                "examples": ["Used for optimization in some hardware models"]
            },
            {
                "term": "Quantum Annealing",
                "definition": "Finds minima of energy landscapes.",
                "examples": ["D-Wave uses this for solving scheduling problems"]
            },
            {
                "term": "Bell's Theorem",
                "definition": "Shows quantum mechanics is non-local.",
                "examples": ["Verified by experiments showing entanglement can't be explained classically"]
            },
            {
                "term": "Quantum Speedup",
                "definition": "When quantum solves problems faster than classical.",
                "examples": ["Shor's algorithm vs. classical factoring"]
            },
            {
                "term": "Quantum Tunneling",
                "definition": "Particle passes through energy barrier.",
                "examples": ["Used in quantum annealers to escape local minima"]
            },
            {
                "term": "Bloch Sphere",
                "definition": "3D visualization of qubit states.",
                "examples": ["|0⟩ is at north pole; superpositions lie on surface"]
            },
            {
                "term": "Phase Kickback",
                "definition": "Phase of one qubit \"kicked\" back to another.",
                "examples": ["Used in phase estimation algorithms"]
            },
            {
                "term": "Variational Quantum Eigensolver (VQE)",
                "definition": "Finds ground states using both quantum and classical steps.",
                "examples": ["Used to model molecules like H₂"]
            },
            {
                "term": "Quantum Volume",
                "definition": "Benchmark for quantum computer's capability.",
                "examples": ["IBM measures their devices' progress with this"]
            },
            {
                "term": "Hybrid Quantum-Classical Algorithms",
                "definition": "Combines quantum subroutines with classical optimization.",
                "examples": ["VQE and QAOA (Quantum Approximate Optimization Algorithm)"]
            }
        ]
        
        # Create quiz questions collection
        quiz_questions = [
    # --- Beginner Level ---
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
            },
            {
                "level": "beginner",
                "question": "Which principle allows a qubit to be in both |0⟩ and |1⟩ states?",
                "options": [
                    "Entanglement",
                    "Superposition",
                    "Tunneling",
                    "Cloning"
                ],
                "correctAnswer": 1
            },
            {
                "level": "beginner",
                "question": "What happens when you measure a qubit?",
                "options": [
                    "It remains unchanged",
                    "It enters superposition",
                    "It collapses to a definite state",
                    "It becomes entangled"
                ],
                "correctAnswer": 2
            },
            {
                "level": "beginner",
                "question": "Which gate flips a qubit from |0⟩ to |1⟩?",
                "options": [
                    "Z gate",
                    "Hadamard gate",
                    "X gate",
                    "CNOT gate"
                ],
                "correctAnswer": 2
            },
            {
                "level": "beginner",
                "question": "What does 'entanglement' mean in quantum computing?",
                "options": [
                    "Two qubits spinning",
                    "Qubits influencing each other at a distance",
                    "A qubit cloning itself",
                    "Adding noise to a qubit"
                ],
                "correctAnswer": 1
            },
            {
                "level": "beginner",
                "question": "Which company developed Qiskit?",
                "options": [
                    "Google",
                    "IBM",
                    "Microsoft",
                    "Intel"
                ],
                "correctAnswer": 1
            },
            {
                "level": "beginner",
                "question": "What is a quantum gate?",
                "options": [
                    "A physical barrier",
                    "A measurement device",
                    "An operation applied to qubits",
                    "A simulation tool"
                ],
                "correctAnswer": 2
            },
            {
                "level": "beginner",
                "question": "What shape is used to represent qubit states visually?",
                "options": [
                    "Cube",
                    "Sphere",
                    "Pyramid",
                    "Circle"
                ],
                "correctAnswer": 1
            },
            {
                "level": "beginner",
                "question": "What is the output of a CNOT gate with inputs |1⟩|0⟩?",
                "options": [
                    "|1⟩|0⟩",
                    "|1⟩|1⟩",
                    "|0⟩|0⟩",
                    "|0⟩|1⟩"
                ],
                "correctAnswer": 1
            },

            # --- Intermediate Level ---
            {
                "level": "intermediate",
                "question": "What is the effect of applying the X gate twice in a row?",
                "options": [
                    "It does nothing",
                    "It leaves the qubit unchanged",
                    "It flips the state back to the original",
                    "It creates a superposition"
                ],
                "correctAnswer": 2
            },
            {
                "level": "intermediate",
                "question": "Which algorithm provides quadratic speedup for search problems?",
                "options": [
                    "Shor’s algorithm",
                    "Grover’s algorithm",
                    "VQE",
                    "QAOA"
                ],
                "correctAnswer": 1
            },
            {
                "level": "intermediate",
                "question": "What is the primary use of the T gate?",
                "options": [
                    "Flipping the qubit",
                    "Creating entanglement",
                    "Adding a phase of π/4",
                    "Measurement"
                ],
                "correctAnswer": 2
            },
            {
                "level": "intermediate",
                "question": "Which representation is used for expressing quantum states?",
                "options": [
                    "Tensor Notation",
                    "Bra-Ket Notation",
                    "Binary Code",
                    "Dirac Notation"
                ],
                "correctAnswer": 1
            },
            {
                "level": "intermediate",
                "question": "What does the Bloch sphere represent?",
                "options": [
                    "Quantum circuit paths",
                    "The full set of classical bits",
                    "Quantum noise levels",
                    "All possible qubit states"
                ],
                "correctAnswer": 3
            },
            {
                "level": "intermediate",
                "question": "What’s a logical qubit?",
                "options": [
                    "An ideal, noiseless qubit",
                    "A single physical qubit",
                    "A qubit after measurement",
                    "An error-corrected group of physical qubits"
                ],
                "correctAnswer": 3
            },
            {
                "level": "intermediate",
                "question": "Which phenomenon prevents quantum states from being copied?",
                "options": [
                    "Entanglement",
                    "Quantum tunneling",
                    "No-cloning theorem",
                    "Superposition collapse"
                ],
                "correctAnswer": 2
            },
            {
                "level": "intermediate",
                "question": "What is QASM used for?",
                "options": [
                    "Simulating molecules",
                    "Running classical programs",
                    "Describing quantum circuits",
                    "Encrypting data"
                ],
                "correctAnswer": 2
            },
            {
                "level": "intermediate",
                "question": "What is the output of QFT on state |1⟩ in a 2-qubit system?",
                "options": [
                    "A uniform superposition",
                    "An entangled state",
                    "A phase-modified superposition",
                    "A logical qubit"
                ],
                "correctAnswer": 2
            },
            {
                "level": "intermediate",
                "question": "Which hardware uses individual charged atoms as qubits?",
                "options": [
                    "Superconducting qubits",
                    "Photonic qubits",
                    "Trapped ion qubits",
                    "Topological qubits"
                ],
                "correctAnswer": 2
            },

            # --- Advanced Level ---
            {
                "level": "advanced",
                "question": "What’s the primary challenge in implementing Shor’s algorithm?",
                "options": [
                    "Measuring qubits",
                    "Factoring is too easy",
                    "Maintaining coherence for many qubits",
                    "Simulating it classically"
                ],
                "correctAnswer": 2
            },
            {
                "level": "advanced",
                "question": "What is the purpose of the Variational Quantum Eigensolver (VQE)?",
                "options": [
                    "To simulate classical systems",
                    "To solve for the ground state of a Hamiltonian",
                    "To amplify amplitude",
                    "To factor integers"
                ],
                "correctAnswer": 1
            },
            {
                "level": "advanced",
                "question": "Which algorithm is used for combinatorial optimization?",
                "options": [
                    "VQE",
                    "Grover’s",
                    "QAOA",
                    "Quantum teleportation"
                ],
                "correctAnswer": 2
            },
            {
                "level": "advanced",
                "question": "What is quantum volume?",
                "options": [
                    "The number of qubits in a processor",
                    "A metric for classical speedup",
                    "A measure of a quantum system’s power and reliability",
                    "A property of quantum memory"
                ],
                "correctAnswer": 2
            },
            {
                "level": "advanced",
                "question": "What causes quantum decoherence?",
                "options": [
                    "Measurement",
                    "Thermal noise and environmental interaction",
                    "Running too many gates",
                    "Using too few qubits"
                ],
                "correctAnswer": 1
            },
            {
                "level": "advanced",
                "question": "What role does phase estimation play in quantum algorithms?",
                "options": [
                    "Compressing data",
                    "Finding energy eigenvalues",
                    "Noise reduction",
                    "Superposition generation"
                ],
                "correctAnswer": 1
            },
            {
                "level": "advanced",
                "question": "Which technique is used in quantum annealing?",
                "options": [
                    "Measurement-based computation",
                    "Slow evolution of quantum states",
                    "Phase estimation",
                    "Fourier transformation"
                ],
                "correctAnswer": 1
            },
            {
                "level": "advanced",
                "question": "What is phase kickback used for?",
                "options": [
                    "Creating entangled states",
                    "Measuring decoherence",
                    "Encoding information into phase",
                    "Running a classical control loop"
                ],
                "correctAnswer": 2
            },
            {
                "level": "advanced",
                "question": "What is the Hilbert space dimension of 3 qubits?",
                "options": [
                    "2",
                    "6",
                    "8",
                    "16"
                ],
                "correctAnswer": 2
            },
            {
                "level": "advanced",
                "question": "Why is quantum error correction difficult?",
                "options": [
                    "Qubits can't be flipped",
                    "Quantum states can't be measured directly",
                    "It’s not needed",
                    "Classical bits interfere"
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