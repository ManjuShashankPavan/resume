// frontend/src/Aptitude/AptitudeTestPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AptitudeTestPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/questions/${level.toLowerCase()}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [level]);

  const handleNext = () => {
    // Check if answer is correct
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Quiz completed
      alert(`Quiz completed! Your score: ${score}/${questions.length}`);
      navigate('/aptitude-test');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    } else {
      navigate('/aptitude-test');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  if (!questions.length) {
    return <div className="text-center py-8">No questions found for this level.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold capitalize">{level} Level</h1>
        <p className="text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-lg font-semibold mt-4">Score: {score}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 rounded-lg border ${
                selectedOption === option
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-700 transition-colors"
        >
          {currentQuestionIndex === 0 ? 'Back to Home' : 'Previous'}
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`rounded-lg px-6 py-2 transition-colors ${
            selectedOption
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default AptitudeTestPage;