import { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../services/api';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');

  useEffect(() => {
    loadQuestions();
  }, [difficultyLevel]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowResults(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);

      const response = await fetchQuizQuestions(difficultyLevel);
      
      if (response && response.data && Array.isArray(response.data)) {
        // Shuffle questions
        const shuffledQuestions = [...response.data].sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
      } else {
        setError('Invalid response format');
      }
    } catch (err) {
      setError('Failed to load quiz questions: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    setSelectedAnswer(answerIndex);
    
    // Check if answer is correct and update score
    const currentQuestion = questions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    // Shuffle questions again
    setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleChangeDifficulty = (level) => {
    setDifficultyLevel(level);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 text-red-700 p-6 rounded-md">
            <h1 className="text-xl font-bold mb-4">Error Loading Quiz</h1>
            <p>{error}</p>
            <button 
              onClick={loadQuestions}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
          <p className="mb-4">There are no quiz questions available for this difficulty level.</p>
          <div className="flex justify-center gap-4">
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <button
                key={level}
                onClick={() => handleChangeDifficulty(level)}
                className={`px-4 py-2 rounded-md ${
                  difficultyLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
            
            <div className="my-8">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {score} / {questions.length}
              </div>
              <p className="text-lg text-gray-700">
                {score === questions.length 
                  ? 'Perfect score! You\'re a quantum master!' 
                  : score > questions.length / 2 
                  ? 'Great job! You have a good understanding of quantum concepts.' 
                  : 'Keep learning! Quantum computing takes time to understand.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Restart Quiz
              </button>
              <div className="relative">
                <select 
                  value={difficultyLevel}
                  onChange={(e) => handleChangeDifficulty(e.target.value)}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quantum Computing Quiz</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Difficulty:</span>
            <div className="relative">
              <select 
                value={difficultyLevel}
                onChange={(e) => handleChangeDifficulty(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                Score: {score}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-md transition-colors ${
                    selectedAnswer === null
                      ? 'bg-gray-50 hover:bg-gray-100'
                      : selectedAnswer === index
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500 border'
                          : 'bg-red-100 border-red-500 border'
                        : index === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500 border'
                          : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : selectedAnswer !== null && index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
            <div className="w-1/3">
              <span className="text-sm text-gray-500">
                {selectedAnswer !== null ? (
                  selectedAnswer === currentQuestion.correctAnswer ? (
                    <span className="text-green-600">Correct!</span>
                  ) : (
                    <span className="text-red-600">Incorrect</span>
                  )
                ) : null}
              </span>
            </div>

            <div className="w-1/3 flex justify-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="w-1/3 flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-4 py-2 rounded-md ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;