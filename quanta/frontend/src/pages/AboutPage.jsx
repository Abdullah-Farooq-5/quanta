const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Quantum Pathways</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            Quanta is dedicated to making quantum computing accessible to students in Pakistan and around the world. 
            We believe that understanding quantum computing is essential for the next generation of scientists, engineers, and 
            technologists, regardless of their background or geographical location.
          </p>
          <p className="text-lg text-gray-700">
            Through structured learning paths, interactive simulations, and comprehensive resources, we aim to bridge the 
            knowledge gap and inspire a new wave of quantum enthusiasts who will shape the future of computation.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">Learning Roadmap</h3>
              <p className="text-gray-700">
                A step-by-step guide from quantum fundamentals to advanced concepts, designed for progressive learning.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">Interactive Simulator</h3>
              <p className="text-gray-700">
                Build and run quantum circuits in your browser, visualize results, and understand quantum behavior.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">Quantum Glossary</h3>
              <p className="text-gray-700">
                Comprehensive definitions of quantum computing terms with examples to reinforce understanding.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">Knowledge Assessment</h3>
              <p className="text-gray-700">
                Test your understanding with quizzes designed for different knowledge levels.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Team</h2>
          <p className="text-lg text-gray-700 mb-6">
            Quanta was created by a computer science student from NUST with a 
            passion for quantum computing and education.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Profile image would go here */}
                <img 
                  src="\src\assets\team\abdullah.jpg" 
                  alt="Team Member" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=Team+Member";
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold">Abdullah Farooq</h3>
              <p className="text-gray-600">Project Lead</p>
            </div>
            {/* Add more team members as needed with the same structure */}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            We welcome your feedback, questions, and suggestions. Reach out to us through any of the following channels:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:chaudharyabdullah387@gmail.com" className="text-blue-600 hover:text-blue-800">
                chaudharyabdullah387@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <a href="https://github.com/Abdullah-Farooq-5" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                GitHub Repository
              </a>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <a href="https://linkedin.com/in/abdullah-farooq-8b00881b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;