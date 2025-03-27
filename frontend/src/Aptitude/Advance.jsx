import React from 'react';

function Advance() {
  return (
    <div className="mt-16 p-5 flex flex-col items-center justify-center">
      <div className="text-center mb-40">
        <h1 className="text-2xl font-bold">Aptitude Questions</h1>
        <h4 className="text-2xl font-semibold">Advance Level</h4>
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

export default Advance;