// AptitudeTest.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AptitudeTest = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/questions/${level}`);
        const data = await response.json();
        setQuestions(data);
        
        // Initialize selected options array
        setSelectedOptions(new Array(data.length).fill(null));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
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
    
    // Navigate to results page or show score
    alert(`Your score: ${score}/${questions.length}`);
    navigate('/');
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions found for this level.</div>;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="aptitude-test-container">
      <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Aptitude Test</h2>
      
      <div className="question-container">
        <div className="question-count">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        
        <div className="question-text">
          {currentQ.question}
        </div>
        
        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="option"
                checked={selectedOptions[currentQuestion] === index}
                onChange={() => handleOptionSelect(index)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="navigation-buttons">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Back
        </button>
        
        {currentQuestion < questions.length - 1 ? (
          <button 
            onClick={handleNext}
            disabled={selectedOptions[currentQuestion] === null}
          >
            Next
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={selectedOptions[currentQuestion] === null}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AptitudeTest;