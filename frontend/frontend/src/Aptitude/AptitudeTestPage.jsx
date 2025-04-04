import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AptitudeTestPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/questions/${level}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      
      setQuestions(data);
      setUserAnswers(new Array(data.length).fill(null));
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to load questions. Please try again later.');
      navigate('/aptitude-test');
    } finally {
      setIsLoading(false);
    }
  }, [level, navigate]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSubmit = useCallback(() => {
    const finalScore = questions.reduce((total, q, index) => {
      const correctAnswerText = q.options[q.answer]; // Get the text of correct answer
      const isCorrect = userAnswers[index] === correctAnswerText;
      
      console.log(`Question ${index + 1}:`, {
        userAnswer: userAnswers[index],
        correctAnswer: correctAnswerText,
        isCorrect
      });
      
      return total + (isCorrect ? 1 : 0);
    }, 0);
    
    setScore(finalScore);
    setIsSubmitted(true);
    alert(`Test completed! Score: ${finalScore}/${questions.length}`);
    navigate('/aptitude-test');
  }, [questions, userAnswers, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
    }
    
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, handleSubmit]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(userAnswers[currentIndex + 1] || null);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(userAnswers[currentIndex - 1] || null);
    } else {
      navigate('/aptitude-test');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) return <div className="text-center py-8">Loading questions...</div>;
  if (!questions.length) return <div className="text-center py-8">No questions available for this level</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold capitalize">{level} Level</h1>
        <div className="text-xl font-semibold bg-red-100 px-4 py-2 rounded-lg">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <p className="text-lg font-semibold mt-2">Score: {score}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              className={`w-full text-left p-3 rounded-lg border ${
                selectedOption === option
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-700"
        >
          {currentIndex === 0 ? 'Back' : 'Previous'}
        </button>
        
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`rounded-lg px-6 py-2 ${
              selectedOption
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AptitudeTestPage;