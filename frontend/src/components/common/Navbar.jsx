import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600 font-medium" : "text-gray-700";
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 100
    }}>
      {/* Desktop and Mobile Navigation */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        {/* Logo */}
        <div>
          <Link to="/" style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#2563eb',
            textDecoration: 'none'
          }}>
            Quanta
          </Link>
        </div>
        
        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          '@media (max-width: 640px)': {
            display: 'none'
          }
        }} className="hidden sm:flex">
          <Link to="/" style={{
            padding: '0.5rem 0',
            color: location.pathname === '/' ? '#2563eb' : '#374151',
            textDecoration: 'none'
          }}>Home</Link>
          
          <Link to="/roadmap" style={{
            padding: '0.5rem 0',
            color: location.pathname === '/roadmap' ? '#2563eb' : '#374151',
            textDecoration: 'none'
          }}>Roadmap</Link>
          
          <Link to="/simulation" style={{
            padding: '0.5rem 0',
            color: location.pathname === '/simulation' ? '#2563eb' : '#374151',
            textDecoration: 'none'
          }}>Simulation</Link>
          
          <Link to="/glossary" style={{
            padding: '0.5rem 0',
            color: location.pathname === '/glossary' ? '#2563eb' : '#374151',
            textDecoration: 'none'
          }}>Glossary</Link>
          
          <Link to="/quiz" style={{
            padding: '0.5rem 0',
            color: location.pathname === '/quiz' ? '#2563eb' : '#374151',
            textDecoration: 'none'
          }}>Quiz</Link>
          
          <Link to="/explore" style={{
            padding: '0.5rem 0',
            color: location.pathname === '/explore' ? '#2563eb' : '#374151',
            textDecoration: 'none'
          }}>Explore</Link>
          
          <Link to="/about" style={{
            padding: '0.5rem 0',
            color: location.pathname === '/about' ? '#2563eb' : '#374151',
            textDecoration: 'none'
          }}>About</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div style={{
          '@media (min-width: 640px)': {
            display: 'none'
          }
        }} className="sm:hidden">
          <button 
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#4b5563',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path 
                  d="M6 18L18 6M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              ) : (
                <path 
                  d="M4 6H20M4 12H20M4 18H20" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          padding: '0.5rem 0',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: 'white',
          '@media (min-width: 640px)': {
            display: 'none'
          }
        }} className="sm:hidden">
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Link to="/" style={{
              padding: '0.75rem',
              color: location.pathname === '/' ? '#2563eb' : '#374151',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }} onClick={() => setIsMenuOpen(false)}>Home</Link>
            
            <Link to="/roadmap" style={{
              padding: '0.75rem',
              color: location.pathname === '/roadmap' ? '#2563eb' : '#374151',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }} onClick={() => setIsMenuOpen(false)}>Roadmap</Link>
            
            <Link to="/simulation" style={{
              padding: '0.75rem',
              color: location.pathname === '/simulation' ? '#2563eb' : '#374151',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }} onClick={() => setIsMenuOpen(false)}>Simulation</Link>
            
            <Link to="/glossary" style={{
              padding: '0.75rem',
              color: location.pathname === '/glossary' ? '#2563eb' : '#374151',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }} onClick={() => setIsMenuOpen(false)}>Glossary</Link>
            
            <Link to="/quiz" style={{
              padding: '0.75rem',
              color: location.pathname === '/quiz' ? '#2563eb' : '#374151',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }} onClick={() => setIsMenuOpen(false)}>Quiz</Link>
            
            <Link to="/explore" style={{
              padding: '0.75rem',
              color: location.pathname === '/explore' ? '#2563eb' : '#374151',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }} onClick={() => setIsMenuOpen(false)}>Explore</Link>
            
            <Link to="/about" style={{
              padding: '0.75rem',
              color: location.pathname === '/about' ? '#2563eb' : '#374151',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }} onClick={() => setIsMenuOpen(false)}>About</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;