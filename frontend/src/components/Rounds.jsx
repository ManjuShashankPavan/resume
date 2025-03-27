import React from "react";
import { useNavigate } from "react-router-dom";

export default function Rounds() {
  const navigate = useNavigate();

  const rounds = [
    { id: "round1", label: "1st Round" },
    { id: "round2", label: "2nd Round" },
    { id: "round3", label: "3rd Round" },
    { id: "round4", label: "4th Round" },
    { id: "round5", label: "5th Round" },
    { id: "round6", label: "6th Round" },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 pt-20 text-center">
      <h2 className="text-xl font-bold mb-6">Select Your Round</h2>
      <div className="flex flex-col gap-4">
        {rounds.map((round) => (
          <button
            key={round.id}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => navigate(`/AptitudeQuiz/${round.id}`)}
          >
            {round.label}
          </button>
        ))}
      </div>
    </div>
  );
}
