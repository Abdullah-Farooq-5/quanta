import { useEffect, useRef, useState } from 'react';

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
      const moveX = mousePosition.x * 10; // Max 5px movement
      const moveY = mousePosition.y * 10;
      sphereRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate3d(1, 1, 1, ${mousePosition.x * 15}deg)`;
    }
  }, [mousePosition]);
  
  return (
    <div className="relative flex items-center justify-center h-64 w-64 md:h-80 md:w-80 mx-auto my-8">
      {/* Main Sphere */}
      <div 
        ref={sphereRef}
        className="absolute w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full shadow-xl animate-quantum-pulse transition-transform duration-300 ease-out"
        style={{
          animation: "pulse-quantum 3s infinite ease-in-out, rotate-quantum 20s infinite linear",
          boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)"
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 bg-gradient-to-t from-transparent via-blue-200 to-white rounded-full opacity-20"></div>
      </div>
      
      {/* Orbiting particles */}
      <div className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: "12s" }}>
        <div className="absolute top-0 left-1/2 w-4 h-4 -ml-2 bg-blue-300 rounded-full shadow-blue-400 shadow-md"></div>
      </div>
      <div className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
        <div className="absolute top-1/4 right-0 w-3 h-3 bg-purple-300 rounded-full shadow-purple-400 shadow-md"></div>
      </div>
      <div className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: "18s" }}>
        <div className="absolute bottom-1/4 left-0 w-5 h-5 bg-cyan-300 rounded-full shadow-cyan-400 shadow-md"></div>
      </div>
      
      {/* Outer ring */}
      <div className="absolute w-56 h-56 md:w-72 md:h-72 border border-blue-300 rounded-full animate-spin-slow opacity-40"
        style={{ animationDuration: "30s" }}></div>
    </div>
  );
};

export default QuantumSphere;