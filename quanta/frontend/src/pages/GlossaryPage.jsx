import { useState, useEffect } from 'react';
import { fetchGlossaryTerms } from '../services/api';

const GlossaryPage = () => {
  const [terms, setTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const termsPerPage = 10;

  useEffect(() => {
    const loadGlossaryTerms = async () => {
      try {
        setIsLoading(true);
        // Update API call to include pagination parameters
        const response = await fetchGlossaryTerms(currentPage, termsPerPage);
        
        if (response && response.data) {
          setTerms(response.data);
          
          // Set pagination data from response
          if (response.pagination) {
            setTotalPages(response.pagination.total_pages);
            setTotalItems(response.pagination.total_items);
          }
        } else {
          setError('Invalid response format');
        }
      } catch (err) {
        setError('Failed to load glossary terms: ' + (err.message || 'Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    loadGlossaryTerms();
  }, [currentPage]); // Reload when page changes

  // When searching, reset to first page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter terms based on search query
  const filteredTerms = searchQuery 
    ? terms.filter(term => 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : terms;

  // Pagination controls
  const paginate = (pageNumber) => {
    // Ensure pageNumber is within valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quantum Computing Glossary</h1>
          <p className="text-lg text-gray-600">
            Essential terms and concepts to help you understand quantum computing
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-4 top-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              {searchQuery ? filteredTerms.length : totalItems} {(searchQuery ? filteredTerms.length : totalItems) === 1 ? 'term' : 'terms'} found
            </p>
            <div className="space-y-6">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((term, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold text-blue-600 mb-2">{term.term}</h2>
                    <p className="text-gray-700 mb-4">{term.definition}</p>
                    {term.examples && term.examples.length > 0 && (
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Examples:</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {term.examples.map((example, idx) => (
                            <li key={idx}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No terms found matching your search.</p>
                </div>
              )}
            </div>
            
            {/* Pagination controls - only show if not searching and have multiple pages */}
            {!searchQuery && totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-l-md ${
                      currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {getPageNumbers().map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                        currentPage === number
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-r-md ${
                      currentPage === totalPages 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GlossaryPage;