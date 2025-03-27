import React from 'react';
import { useNavigate } from 'react-router-dom';

const AptitudeHome = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Aptitude Test</h1>
      <div className="max-w-md mx-auto space-y-4">
        <button 
          onClick={() => navigate('/aptitude-test/Basic')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-lg"
        >
          Basic Level
        </button>
        <button 
          onClick={() => navigate('/aptitude-test/intermediate')}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg text-lg"
        >
          Intermediate Level
        </button>
        <button 
          onClick={() => navigate('/aptitude-test/advanced')}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg text-lg"
        >
          Advanced Level
        </button>
      </div>
    </div>
  );
};

export default AptitudeHome;