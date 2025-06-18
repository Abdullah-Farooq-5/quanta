import { useState, useEffect } from 'react';
import { simulateCircuit } from '../services/api';

const SimulationPage = () => {
  const [qubits, setQubits] = useState(2);
  const [circuit, setCircuit] = useState([]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGate, setSelectedGate] = useState('h');

  const gates = [
    { id: 'h', name: 'H', description: 'Hadamard gate - Creates superposition' },
    { id: 'x', name: 'X', description: 'Pauli-X gate - Bit flip (NOT gate)' },
    { id: 'y', name: 'Y', description: 'Pauli-Y gate - Bit and phase flip' },
    { id: 'z', name: 'Z', description: 'Pauli-Z gate - Phase flip' },
    { id: 'cx', name: 'CNOT', description: 'Controlled-NOT gate - Entangles qubits' },
  ];

  const handleAddGate = (qubit) => {
    if (selectedGate === 'cx') {
      // For CNOT gate, we need to select control and target qubits
      setCircuit([...circuit, {
        name: selectedGate,
        controls: [qubit],
        targets: [(qubit + 1) % qubits] // Default target is next qubit (wrapped)
      }]);
    } else {
      // For single qubit gates
      setCircuit([...circuit, {
        name: selectedGate,
        targets: [qubit]
      }]);
    }
  };

  const handleRemoveGate = (index) => {
    const updatedCircuit = [...circuit];
    updatedCircuit.splice(index, 1);
    setCircuit(updatedCircuit);
  };

  const handleSimulate = async () => {
    if (circuit.length === 0) {
      setError('Please add at least one gate to the circuit');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await simulateCircuit({
        qubits: qubits,
        gates: circuit
      });
      setResults(response.data);
    } catch (err) {
      setError('Error simulating circuit: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCircuit([]);
    setResults(null);
    setError(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Quantum Circuit Simulator</h1>
        <p className="mb-8 text-gray-600">
          Create and simulate quantum circuits using this interactive tool. Add gates to your qubits and see the results of your quantum computation.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Circuit Configuration</h2>
          
          <div className="flex items-center mb-6">
            <label htmlFor="qubitCount" className="mr-4 font-medium">Number of Qubits:</label>
            <input
              id="qubitCount"
              type="number"
              min="1"
              max="5"
              value={qubits}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value >= 1 && value <= 5) {
                  setQubits(value);
                  setCircuit([]);
                  setResults(null);
                }
              }}
              className="w-16 p-2 border border-gray-300 rounded-md"
            />
            <span className="text-gray-500 ml-2">(Max: 5)</span>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Select Gate:</h3>
            <div className="flex flex-wrap gap-2">
              {gates.map(gate => (
                <button
                  key={gate.id}
                  onClick={() => setSelectedGate(gate.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedGate === gate.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  title={gate.description}
                >
                  {gate.name}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {gates.find(g => g.id === selectedGate)?.description}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Circuit Builder</h2>
          
          <div className="mb-6 overflow-x-auto">
            <div className="min-w-full">
              {/* Qubit lines */}
              {Array.from({ length: qubits }).map((_, i) => (
                <div key={i} className="flex items-center mb-4">
                  <div className="w-8 mr-4 font-mono font-bold">q{i}:</div>
                  <div className="flex-grow h-0.5 bg-gray-300 relative">
                    {/* Add gate button */}
                    <button
                      onClick={() => handleAddGate(i)}
                      className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
                      title="Add gate to this qubit"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-medium mb-2">Circuit Steps:</h3>
          {circuit.length > 0 ? (
            <div className="space-y-2 mb-4">
              {circuit.map((gate, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span>
                    <span className="font-bold">{gates.find(g => g.id === gate.name)?.name}</span> gate on 
                    {gate.controls ? (
                      <> control: q{gate.controls.join(', ')}, target: q{gate.targets.join(', ')}</>
                    ) : (
                      <> q{gate.targets.join(', ')}</>
                    )}
                  </span>
                  <button
                    onClick={() => handleRemoveGate(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic mb-4">No gates added yet. Click the + button on a qubit line to add a gate.</p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              Reset Circuit
            </button>
            <button
              onClick={handleSimulate}
              disabled={isLoading || circuit.length === 0}
              className={`px-4 py-2 rounded-md ${
                isLoading || circuit.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Simulating..." : "Run Simulation"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Simulation Results</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Measurement Outcomes:</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(results.counts).map(([state, count], index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <span className="font-mono">{state}: </span>
                    <span className="font-bold">{count}</span>
                    <span className="text-gray-500"> ({((count / 1024) * 100).toFixed(1)}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {results.visualization && (
              <div>
                <h3 className="font-medium mb-2">Visualization:</h3>
                <img 
                  src={`data:image/png;base64,${results.visualization}`} 
                  alt="Quantum circuit results visualization"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationPage;