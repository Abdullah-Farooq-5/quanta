import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { checkApiHealth } from '../services/api';

const QuantumSphere = () => {
  const sphereRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for subtle movement effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Apply subtle transform based on mouse position
  useEffect(() => {
    if (sphereRef.current) {
      const moveX = mousePosition.x * 10; // Max 10px movement
      const moveY = mousePosition.y * 10;
      sphereRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate3d(1, 1, 1, ${mousePosition.x * 15}deg)`;
    }
  }, [mousePosition]);
  
  return (
    <div className="relative flex items-center justify-center h-64 w-64">
      {/* Main Sphere */}
      <div 
        ref={sphereRef}
        className="absolute w-48 h-48 rounded-full transition-transform duration-300 ease-out"
        style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          animation: "pulse-quantum 3s infinite ease-in-out, rotate-quantum 20s infinite linear",
          boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)"
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 bg-gradient-to-t from-transparent via-blue-200 to-white rounded-full opacity-20"></div>
      </div>
      
      {/* Orbiting particles */}
      <div className="absolute w-full h-full" style={{ animation: "spin 12s linear infinite" }}>
        <div className="absolute top-0 left-1/2 w-4 h-4 -ml-2 bg-blue-300 rounded-full shadow-blue-400 shadow-md"></div>
      </div>
      <div className="absolute w-full h-full" style={{ animation: "spin 15s linear infinite reverse" }}>
        <div className="absolute top-1/4 right-0 w-3 h-3 bg-purple-300 rounded-full shadow-purple-400 shadow-md"></div>
      </div>
      <div className="absolute w-full h-full" style={{ animation: "spin 18s linear infinite" }}>
        <div className="absolute bottom-1/4 left-0 w-5 h-5 bg-cyan-300 rounded-full shadow-cyan-400 shadow-md"></div>
      </div>
      
      {/* Outer ring */}
      <div className="absolute w-60 h-60 border border-blue-300 rounded-full opacity-40"
        style={{ animation: "spin 30s linear infinite" }}></div>
    </div>
  );
};

const HomePage = () => {
  const [apiStatus, setApiStatus] = useState({ status: 'checking', message: '' });

  useEffect(() => {
    const checkApi = async () => {
      try {
        const result = await checkApiHealth();
        setApiStatus({ status: 'online', message: result.message });
      } catch (error) {
        setApiStatus({ status: 'offline', message: 'API connection failed' });
      }
    };
    
    checkApi();
    
    // Add keyframes for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-quantum {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      
      @keyframes rotate-quantum {
        from { transform: rotate3d(1, 1, 1, 0deg); }
        to { transform: rotate3d(1, 1, 1, 360deg); }
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Begin Your Quantum Computing Journey
              </h1>
              <p className="text-xl mb-8">
                Discover the power of quantum computing through an accessible, structured learning pathway designed for students in Pakistan and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/roadmap" className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-gray-100 transition-colors">
                  Start Learning
                </Link>
                <Link to="/simulation" className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors">
                  Try Simulation
                </Link>
              </div>
              
              {/* API Status Indicator */}
              <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20">
                <span className={`h-2 w-2 rounded-full mr-2 ${apiStatus.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                {apiStatus.status === 'online' ? 'Live Simulation Available' : 'Offline Mode'}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
              {/* Animated Quantum Sphere */}
              <QuantumSphere />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn Quantum Computing?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emerging Technology</h3>
              <p className="text-gray-600">
                Quantum computing is transforming industries from cryptography to drug discovery, with companies like IBM and Google heavily investing in this technology.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Opportunities</h3>
              <p className="text-gray-600">
                The demand for quantum computing professionals far exceeds the current talent pool, creating exceptional opportunities for early adopters.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Solving the Impossible</h3>
              <p className="text-gray-600">
                Quantum algorithms can tackle problems that are practically impossible for classical computers, from optimization to molecular simulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">The Problem We're Solving</h2>
              <p className="text-lg text-gray-700 mb-6">
                Students in Pakistan and similar regions face significant barriers when trying to learn about quantum computing:
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Lack of structured educational resources for beginners</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Limited university curriculum coverage of quantum computing</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Overwhelming complexity of existing learning materials</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Lack of awareness about quantum computing career paths</span>
                </li>
              </ul>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <img 
                src="/assets/images/quantum-learning-gap.svg" 
                alt="Quantum education gap illustration" 
                className="mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our platform provides a step-by-step approach to learning quantum computing, from basics to practical applications.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/roadmap" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Learning Roadmap</h3>
              <p className="mb-4 text-gray-700">A structured path from quantum basics to practical programming</p>
              <span className="text-blue-600 flex items-center justify-center">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link to="/simulation" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Interactive Simulation</h3>
              <p className="mb-4 text-gray-700">Build and run quantum circuits directly in your browser</p>
              <span className="text-blue-600 flex items-center justify-center">
                Try Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;