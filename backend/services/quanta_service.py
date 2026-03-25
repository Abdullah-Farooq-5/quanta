from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer
from qiskit.visualization import plot_histogram
# Add these lines at the top of your file, before importing pyplot
import matplotlib
matplotlib.use('Agg')  # Use the 'Agg' backend which doesn't require a GUI
import matplotlib.pyplot as plt
import io
import base64

def create_circuit(circuit_data):
    """Create a quantum circuit from the provided data"""
    num_qubits = circuit_data.get('qubits', 2)
    qc = QuantumCircuit(num_qubits, num_qubits)
    
    # Add gates based on the circuit data
    for gate in circuit_data.get('gates', []):
        gate_name = gate.get('name', '').lower()
        
        if gate_name == 'h':
            for target in gate.get('targets', []):
                qc.h(target)
        elif gate_name == 'x':
            for target in gate.get('targets', []):
                qc.x(target)
        elif gate_name == 'z':
            for target in gate.get('targets', []):
                qc.z(target)
        elif gate_name == 'y':
            for target in gate.get('targets', []):
                qc.y(target)
        elif gate_name == 'cx' or gate_name == 'cnot':
            for i, control in enumerate(gate.get('controls', [])):
                if i < len(gate.get('targets', [])):
                    qc.cx(control, gate.get('targets')[i])
        # Add more gates as needed
    
    # Add measurement
    qc.measure_all()
    
    return qc

def run_simulation(circuit):
    """Run the quantum circuit simulation"""
    # Get the simulator
    simulator = Aer.get_backend('qasm_simulator')
    
    # In Qiskit 2.0+, we use run() instead of execute()
    transpiled_circuit = transpile(circuit, simulator)
    job = simulator.run(transpiled_circuit, shots=1024)
    
    result = job.result()
    counts = result.get_counts(circuit)
    
    # Create histogram visualization
    plt.figure(figsize=(10, 6))
    plt.bar(counts.keys(), counts.values())
    plt.xlabel('Measurement Outcome')
    plt.ylabel('Counts')
    plt.title('Quantum Circuit Simulation Results')
    plt.xticks(rotation=45)
    
    # Convert plot to base64 image
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_str = base64.b64encode(buf.getvalue()).decode('utf-8')
    plt.close()
    
    return {
        'counts': counts,
        'visualization': img_str
    }