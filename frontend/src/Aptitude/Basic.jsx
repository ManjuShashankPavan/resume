import React from 'react';

function Basic() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold">Aptitude questions</h1>
        <h1 className="text-2xl font-semibold">Basic Level</h1>
      </div>

      <div className="flex justify-center gap-4">
        <button className="bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-700 transition-colors">
          Back
        </button>
        <button className="bg-green-500 text-white rounded-lg px-6 py-2 hover:bg-green-600 transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}

export default Basic; // Fixed export