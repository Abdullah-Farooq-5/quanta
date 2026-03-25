import { useState } from 'react';

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('resources');
  
  const resources = [
    {
      category: "Online Courses",
      items: [
        {
          title: "Quantum Computing for the Very Curious",
          description: "An excellent introduction to quantum computing that explains concepts gradually.",
          link: "https://quantum.country/qcvc",
          image: "/assets/images/quantum-country.jpg",
          level: "Beginner"
        },
        {
          title: "Qiskit Textbook",
          description: "A comprehensive guide to quantum computing using Qiskit.",
          link: "https://qiskit.org/textbook",
          image: "/assets/images/qiskit.jpg",
          level: "Beginner to Advanced"
        },
        {
          title: "MIT Quantum Physics Course",
          description: "University-level course on quantum mechanics and its applications.",
          link: "https://ocw.mit.edu/courses/physics/8-04-quantum-physics-i-spring-2016/",
          image: "/assets/images/mit-ocw.jpg",
          level: "Intermediate"
        }
      ]
    },
    {
      category: "Books",
      items: [
        {
          title: "Quantum Computing for Everyone",
          description: "By Chris Bernhardt - An accessible introduction with minimal math.",
          link: "https://mitpress.mit.edu/books/quantum-computing-everyone",
          image: "/assets/images/quantum-everyone.jpg",
          level: "Beginner"
        },
        {
          title: "Quantum Computation and Quantum Information",
          description: "By Nielsen and Chuang - The definitive textbook on quantum computing.",
          link: "https://www.cambridge.org/core/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE",
          image: "/assets/images/nielsen-chuang.jpg",
          level: "Advanced"
        }
      ]
    },
    {
      category: "Tools & Simulators",
      items: [
        {
          title: "IBM Quantum Experience",
          description: "Run real quantum circuits on IBM's quantum computers.",
          link: "https://quantum-computing.ibm.com/",
          image: "/assets/images/ibm-quantum.jpg",
          level: "All Levels"
        },
        {
          title: "Quantum Playground",
          description: "A browser-based quantum circuit simulator with a visual interface.",
          link: "http://www.quantumplayground.net/",
          image: "/assets/images/quantum-playground.jpg",
          level: "Beginner to Intermediate"
        }
      ]
    }
  ];
  
  const researchArticles = [
    {
      title: "Quantum Supremacy Using a Programmable Superconducting Processor",
      authors: "Google AI Quantum and collaborators",
      publication: "Nature",
      year: 2019,
      description: "Google's paper claiming quantum supremacy with their 53-qubit Sycamore processor.",
      link: "https://www.nature.com/articles/s41586-019-1666-5"
    },
    {
      title: "A Blueprint for Practical Quantum Computers",
      authors: "Martinis Group at UCSB",
      publication: "Science",
      year: 2017,
      description: "A roadmap for building practical quantum computers using superconducting qubits.",
      link: "https://science.sciencemag.org/content/354/6317/1234"
    },
    {
      title: "Quantum Algorithms for Linear Systems of Equations",
      authors: "Harrow, Hassidim, Lloyd",
      publication: "Physical Review Letters",
      year: 2009,
      description: "The HHL algorithm for solving linear systems of equations exponentially faster than classical methods.",
      link: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.103.150502"
    }
  ];
  
  const companies = [
    {
      name: "IBM Quantum",
      description: "Pioneers in quantum computing hardware, providing cloud access to quantum processors.",
      website: "https://www.ibm.com/quantum-computing/",
      image: "/assets/images/ibm.jpg"
    },
    {
      name: "Google Quantum AI",
      description: "Research team focused on building useful quantum computers and algorithms.",
      website: "https://quantumai.google/",
      image: "/assets/images/google-quantum.jpg"
    },
    {
      name: "Rigetti Computing",
      description: "Develops quantum integrated circuits and provides quantum cloud services.",
      website: "https://www.rigetti.com/",
      image: "/assets/images/rigetti.jpg"
    },
    {
      name: "IonQ",
      description: "Building quantum computers using trapped ion technology.",
      website: "https://ionq.com/",
      image: "/assets/images/ionq.jpg"
    },
    {
      name: "Microsoft Quantum",
      description: "Research in topological quantum computation and the Q# quantum programming language.",
      website: "https://azure.microsoft.com/en-us/services/quantum/",
      image: "/assets/images/microsoft-quantum.jpg"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Explore Quantum Computing</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover resources, research articles, and companies in the quantum computing ecosystem.
        </p>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === 'resources'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Learning Resources
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === 'research'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Research Articles
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === 'companies'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Quantum Companies
          </button>
        </div>

        {/* Resources tab content */}
        {activeTab === 'resources' && (
          <div className="space-y-12">
            {resources.map((resourceGroup, groupIndex) => (
              <div key={groupIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{resourceGroup.category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resourceGroup.items.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gray-200 flex justify-center items-center">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200?text=Resource+Image";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {resource.level}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{resource.description}</p>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          Visit Resource
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Research tab content */}
        {activeTab === 'research' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Research Papers</h2>
            <div className="space-y-6">
              {researchArticles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Authors:</span> {article.authors}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Published in:</span> {article.publication}, {article.year}
                  </p>
                  <p className="text-gray-700 mb-4">{article.description}</p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read Paper
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://arxiv.org/list/quant-ph/recent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Find more papers on arXiv Quantum Physics
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* Companies tab content */}
        {activeTab === 'companies' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Leading Quantum Computing Companies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gray-200 flex justify-center items-center">
                    <img
                      src={company.image}
                      alt={company.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Company+Logo";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.name}</h3>
                    <p className="text-gray-600 mb-4">{company.description}</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Visit Website
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;