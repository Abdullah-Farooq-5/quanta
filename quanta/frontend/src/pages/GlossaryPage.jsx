import { useState, useEffect } from 'react';
import { fetchGlossaryTerms } from '../services/api';

const GlossaryPage = () => {
  const [terms, setTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadGlossaryTerms = async () => {
      try {
        setIsLoading(true);
        const response = await fetchGlossaryTerms();
        if (response && response.data) {
          // Sort terms alphabetically
          const sortedTerms = response.data.sort((a, b) => 
            a.term.localeCompare(b.term)
          );
          setTerms(sortedTerms);
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
  }, []);

  // Filter terms based on search query
  const filteredTerms = terms.filter(term => 
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
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
          </>
        )}
      </div>
    </div>
  );
};

export default GlossaryPage;