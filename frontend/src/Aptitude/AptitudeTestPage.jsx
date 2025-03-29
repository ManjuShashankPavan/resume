import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AptitudeTestPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Memoized submit handler
  const handleSubmit = useCallback(() => {
    // Final answer for current question
    const finalAnswers = [...userAnswers];
    finalAnswers[currentQuestionIndex] = selectedOption;
    
    // Calculate score
    const calculatedScore = questions.reduce((total, question, index) => {
      return total + (finalAnswers[index] === question.answer ? 1 : 0);
    }, 0);
    
    setScore(calculatedScore);
    setIsSubmitted(true);
    
    console.log('Submission details:', {
      answers: finalAnswers,
      correctAnswers: questions.map(q => q.answer),
      score: calculatedScore
    });
    
    alert(`Test submitted! Your score: ${calculatedScore}/${questions.length}`);
    navigate('/aptitude-test');
  }, [currentQuestionIndex, navigate, questions, selectedOption, userAnswers]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
    }
    
    const timer = timeLeft > 0 && !isSubmitted && setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, handleSubmit]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/questions/${level.toLowerCase()}`);
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid questions data format');
        }
        
        setQuestions(data);
        setUserAnswers(new Array(data.length).fill(null));
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to load questions');
        navigate('/aptitude-test');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [level, navigate]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(userAnswers[currentQuestionIndex + 1] || null);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[currentQuestionIndex - 1] || null);
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
  if (!questions.length) return <div className="text-center py-8">No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];

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
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-lg font-semibold mt-2">Score: {score}</p>
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
          {currentQuestionIndex === 0 ? 'Back to Home' : 'Previous'}
        </button>
        
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2"
          >
            Submit Test
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