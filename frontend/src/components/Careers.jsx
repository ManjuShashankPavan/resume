import React from "react";
import { useEffect } from 'react';


const jobListings = [
  { title: "Frontend Developer", location: " ", type: " " },
  { title: "Backend Developer", location: " ", type: " " },
];

export default function Careers() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 ">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Careers at SpeaQ AI
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-700 text-center mb-4">
          Join our team and help revolutionize AI-powered interview training.
        </p>

        <div className="space-y-4">
          {jobListings.map((job, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.location} - {job.type}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
