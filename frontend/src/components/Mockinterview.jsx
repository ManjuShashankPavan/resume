import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import {AptitudeTest} from '../Aptitude/AptitudeTest';


const MockInterview = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [showPopup, setShowPopup] = useState(false);

  const handleStartInterview = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1500); // Hide popup after 2 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Interview Preparation Platform</h1>
      <p className="text-gray-600 mt-2 text-center">
        Prepare effectively for your interviews with structured mock tests
      </p>

      {/* Card Container */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
        {/* Aptitude Test Card */}
        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/AptitudeTest")} // Navigate to Aptitude Test
        >
          <img src="/AptitudeIcon.jpg" alt="Aptitude Test" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4"> Aptitude Test</h2>
          <p className="text-gray-600 mt-2">
            Sharpen your problem-solving skills with aptitude tests
          </p>
        </div>

        {/* Technical Interview Card */}
        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/TechnicalInterview")} // Navigate to Technical Interview
        >
          <img src="/TechnicalIcon.jpg" alt="Technical Interview" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Technical Interview</h2>
          <p className="text-gray-600 mt-2">
            Practice coding and technical problem-solving questions
          </p>
        </div>

        {/* HR Interview Card */}
        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/HRInterview")} // Navigate to HR Interview
        >
          <img src="/HRIcon.jpg" alt="HR Interview" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">HR Interview</h2>
          <p className="text-gray-600 mt-2">
            Learn how to answer behavioral and situational questions
          </p>
        </div>
      </div>

      {/* Start Button */}
      <div className="mt-8 w-full max-w-md relative">
        <button 
          className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all w-full relative group"
          onClick={handleStartInterview} // Show popup when clicked
        >
          Start Your Interview
        </button>
        {showPopup && (
          <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow-lg">
            Choose any 1 among the above three
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;