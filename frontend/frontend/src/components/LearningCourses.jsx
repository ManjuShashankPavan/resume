import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation


const LearningCourses = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [showPopup, setShowPopup] = useState(false);

  const handleStartLearning = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1500); // Hide popup after 2 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Learning Courses Platform</h1>
      <p className="text-gray-600 mt-2 text-center">
        Enhance your skills with our structured learning courses
      </p>

      {/* Card Container */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
        {/* Frontend Course Card */}
        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/FrontendCourse")} // Navigate to Frontend Course
        >
          <img src="/FrontendIcon.jpg" alt="Frontend Course" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Frontend Development</h2>
          <p className="text-gray-600 mt-2">
            Master frontend technologies and build interactive web interfaces
          </p>
        </div>

        {/* Backend Course Card */}
        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/BackendCourse")} // Navigate to Backend Course
        >
          <img src="/BackendIcon.jpg" alt="Backend Course" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Backend Development</h2>
          <p className="text-gray-600 mt-2">
            Learn server-side programming and database management
          </p>
        </div>
      </div>

      {/* Start Learning Button */}
      <div className="mt-8 w-full max-w-md relative">
        <button 
          className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all w-full relative group"
          onClick={handleStartLearning} // Show popup when clicked
        >
          Start Learning
        </button>
        {showPopup && (
          <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow-lg">
            Choose any 1 among the above two
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningCourses;
