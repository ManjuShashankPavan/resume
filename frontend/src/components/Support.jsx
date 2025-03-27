import React, { useState } from "react";
import { useEffect } from 'react';


export default function Support() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support request submitted!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-slate-200">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Support
      </h1>

      <div className="bg-slate-100 p-6 rounded-lg shadow-md border border-gray-200">
        <p className="text-black mb-4 text-center">
          Need help? Fill out the form below, and our support team will get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded outline-blue-700"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded outline-blue-700"
            required
          />

          <textarea
            name="message"
            placeholder="Describe your issue"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32 outline-blue-700"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
