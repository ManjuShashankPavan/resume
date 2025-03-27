import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col flex-grow items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 mt-10">
      <div className="max-w-3xl bg-white text-gray-900 p-8 rounded-2xl shadow-lg mt-16">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg text-center">
          Welcome to <span className="font-semibold text-blue-600">SpeaQ</span>, an innovative AI-powered interview 
          preparation tool built with passion, dedication, and cutting-edge technology.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">Our Mission</h2>
          <p className="text-gray-700">
            We understand the challenges faced by students and professionals while preparing for interviews. 
            Traditional methods lack personalized insights and real-time feedback—that's where SpeaQ comes in. 
            Our platform aims to:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>Provide realistic AI-driven interview simulations.</li>
            <li>Offer instant feedback on body language, gaze, and responses.</li>
            <li>Enhance confidence and communication skills for better job success.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">Why We Built This</h2>
          <p className="text-gray-700">
            As aspiring software engineers from <span className="font-semibold">East Point College</span>, 
            we recognized the growing importance of AI in career development. We wanted to leverage our 
            skills in React, WebRTC, Face API, and Supabase to develop a platform that not only helps 
            users practice interviews but also improves their self-awareness through AI-based analysis.
          </p>
        </div>

        <div className="text-center mt-6">
          <p className="text-lg font-semibold text-gray-800">
            Join us on this journey and take your interview skills to the next level!
          </p>
        </div>
      </div>
    </div>
  );
}
