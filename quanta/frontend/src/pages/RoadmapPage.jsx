import { useState } from 'react';

const RoadmapPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const roadmapSteps = [
    {
      id: 0,
      title: "Mathematical Foundations",
      description: "Understanding the mathematical concepts that underpin quantum computing",
      topics: [
        {
          name: "Linear Algebra",
          description: "Vectors, matrices, eigenvalues, and tensor products",
          resources: [
            { name: "MIT OpenCourseWare - Linear Algebra", url: "https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/" },
            { name: "3Blue1Brown - Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" }
          ]
        },
        {
          name: "Complex Numbers",
          description: "Understanding complex numbers, complex conjugates, and absolute values",
          resources: [
            { name: "Khan Academy - Complex Numbers", url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:complex" }
          ]
        },
        {
          name: "Probability Theory",
          description: "Basic probability concepts and quantum measurement",
          resources: [
            { name: "Khan Academy - Probability", url: "https://www.khanacademy.org/math/statistics-probability/probability-library" }
          ]
        }
      ]
    },
    {
      id: 1,
      title: "Quantum Mechanics Basics",
      description: "Core principles of quantum mechanics relevant to computing",
      topics: [
        {
          name: "Quantum States",
          description: "Qubits, superposition, and quantum state vectors",
          resources: [
            { name: "Qiskit Textbook - The Qubit", url: "https://qiskit.org/textbook/ch-states/representing-qubit-states.html" }
          ]
        },
        {
          name: "Quantum Measurement",
          description: "Measurement operators and Born's rule",
          resources: [
            { name: "Qiskit Textbook - Single Qubit Gates", url: "https://qiskit.org/textbook/ch-states/single-qubit-gates.html" }
          ]
        },
        {
          name: "Entanglement",
          description: "Bell states and non-local correlations",
          resources: [
            { name: "Qiskit Textbook - Multiple Qubits and Entanglement", url: "https://qiskit.org/textbook/ch-gates/multiple-qubits-entanglement.html" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Quantum Gates and Circuits",
      description: "Building blocks of quantum computation",
      topics: [
        {
          name: "Single-Qubit Gates",
          description: "X, Y, Z, H, S, T gates and Bloch sphere representation",
          resources: [
            { name: "Qiskit Textbook - Single-Qubit Gates", url: "https://qiskit.org/textbook/ch-states/single-qubit-gates.html" }
          ]
        },
        {
          name: "Multi-Qubit Gates",
          description: "CNOT, SWAP, Toffoli and their applications",
          resources: [
            { name: "Qiskit Textbook - Multiple Qubits and Entanglement", url: "https://qiskit.org/textbook/ch-gates/multiple-qubits-entanglement.html" }
          ]
        },
        {
          name: "Circuit Construction",
          description: "Building quantum circuits with gates",
          resources: [
            { name: "Qiskit Tutorials - Circuit Basics", url: "https://qiskit.org/documentation/tutorials/circuits/01_circuit_basics.html" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Quantum Algorithms",
      description: "Understanding key quantum algorithms and their advantages",
      topics: [
        {
          name: "Deutsch-Jozsa Algorithm",
          description: "Determining if a function is constant or balanced",
          resources: [
            { name: "Qiskit Textbook - Deutsch-Jozsa Algorithm", url: "https://qiskit.org/textbook/ch-algorithms/deutsch-jozsa.html" }
          ]
        },
        {
          name: "Grover's Algorithm",
          description: "Quadratic speedup for searching unsorted databases",
          resources: [
            { name: "Qiskit Textbook - Grover's Algorithm", url: "https://qiskit.org/textbook/ch-algorithms/grover.html" }
          ]
        },
        {
          name: "Shor's Algorithm",
          description: "Exponential speedup for integer factorization",
          resources: [
            { name: "Qiskit Textbook - Shor's Algorithm", url: "https://qiskit.org/textbook/ch-algorithms/shor.html" }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Qiskit Programming",
      description: "Practical quantum programming with Qiskit",
      topics: [
        {
          name: "Qiskit Basics",
          description: "Installation and first quantum program",
          resources: [
            { name: "Qiskit Getting Started Guide", url: "https://qiskit.org/documentation/getting_started.html" }
          ]
        },
        {
          name: "Building Circuits",
          description: "Creating and visualizing quantum circuits",
          resources: [
            { name: "Qiskit Circuit Library", url: "https://qiskit.org/documentation/apidoc/circuit_library.html" }
          ]
        },
        {
          name: "Simulating Circuits",
          description: "Running circuits on simulators and real quantum devices",
          resources: [
            { name: "Qiskit Providers", url: "https://qiskit.org/documentation/apidoc/providers.html" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quantum Computing Roadmap</h1>
          <p className="text-lg text-gray-600 mb-8">Follow this structured learning path from quantum fundamentals to practical programming skills.</p>
        </div>

        <div className="flex flex-wrap mb-8">
          {roadmapSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`px-4 py-2 m-1 rounded-full ${
                activeStep === step.id 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{roadmapSteps[activeStep].title}</h2>
          <p className="text-gray-600 mb-6">{roadmapSteps[activeStep].description}</p>

          <div className="space-y-8">
            {roadmapSteps[activeStep].topics.map((topic, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.name}</h3>
                <p className="text-gray-600 mb-3">{topic.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Recommended Resources:</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-600">
                    {topic.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={`px-4 py-2 rounded-md ${
              activeStep === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous Step
          </button>
          <button
            onClick={() => setActiveStep(Math.min(roadmapSteps.length - 1, activeStep + 1))}
            disabled={activeStep === roadmapSteps.length - 1}
            className={`px-4 py-2 rounded-md ${
              activeStep === roadmapSteps.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;