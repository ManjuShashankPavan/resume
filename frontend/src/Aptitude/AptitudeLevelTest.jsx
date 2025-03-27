import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AptitudeLevelTest = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions/${level}`);
        const data = await response.json();
        setQuestions(data);
        setSelectedOptions(new Array(data.length).fill(null));
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions');
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [level]);

  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] !== null && 
          question.options[selectedOptions[index]] === question.answer) {
        score++;
      }
    });
    
    // Navigate to results or show score
    alert(`Your score: ${score}/${questions.length}`);
    navigate('/aptitude-test');
  };

  if (loading) return <div className="text-center py-8">Loading questions...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (questions.length === 0) return <div className="text-center py-8">No questions found</div>;

  const currentQ = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 capitalize">{level} Level Test</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-gray-600 mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        
        <div className="text-xl font-semibold mb-6">
          {currentQ.question}
        </div>
        
        <div className="space-y-3 mb-8">
          {currentQ.options.map((option, index) => (
            <div 
              key={index} 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedOptions[currentQuestion] === index 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg ${
              currentQuestion === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Back
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button 
              onClick={handleNext}
              disabled={selectedOptions[currentQuestion] === null}
              className={`px-6 py-2 rounded-lg ${
                selectedOptions[currentQuestion] === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={selectedOptions[currentQuestion] === null}
              className={`px-6 py-2 rounded-lg ${
                selectedOptions[currentQuestion] === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptitudeLevelTest;