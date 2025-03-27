import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from 'react';


export default function ContactUs() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="p-8 max-w-2xl mx-auto shadow-xl bg-gray-100 rounded-lg mt-20">
      <h1 className="text-3xl font-bold text-left text-gray-900">Contact Us</h1>
      <h4 className="text-lg mt-2 ml-10 text-left text-gray-700">
        Have a question? Reach out below or email us.
      </h4>

      <div className="mt-6 space-y-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">📍 Address</h3>
          <p className="mt-1 ml-10 text-gray-700">
            
            Bengaluru, Karnataka 560049
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">📞 Phone</h3>
          <p className="mt-1 ml-10 text-gray-700">+91 9945829916</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">✉️ Email</h3>
          <p className="mt-1 ml-10 text-gray-700">
            luxuryforeverydayneeds@gmail.com
          </p>
        </div>
      </div>

      {/* ✅ Corrected Link to the Contact Page */}
      <Link to="/contact">
        <button className="bg-blue-600 text-white py-3 px-8 rounded-lg mt-8 hover:bg-blue-700 transition-all duration-300 shadow-md inline-block">
          Contact
        </button>
      </Link>
    </div>
  );
}
