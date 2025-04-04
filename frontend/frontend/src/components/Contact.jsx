import React from "react";
import { useEffect } from 'react';


export default function Contact() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="p-10 max-w-10xl mx-auto border shadow-lg mt-16 bg-slate-200">
      <h1 className="text-3xl font-bold text-green-600">Send Message</h1>

      <h4 className="mt-6">Full Name</h4>
      <input
        type="text"
        className="w-full p-3 border border-green-500 hover:bg-slate-300 outline-blue-400 rounded-md"
        placeholder=" "
      />

      <h4 className="mt-6">Email</h4>
      <input
        type="email"
        className="w-full p-3 border border-green-500 hover:bg-slate-300 outline-blue-400 rounded-md"
        placeholder=" "
      />

      <h4 className="mt-6">Type your Message...</h4>
      <textarea
        className="w-full p-3 border border-green-500 hover:bg-slate-300 outline-blue-400 rounded-md"
        placeholder=" "
        rows="5"
      ></textarea>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-blue-700">
        Send
      </button>
    </div>
  );
}
