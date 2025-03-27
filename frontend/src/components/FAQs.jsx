import React, { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from 'react';


export default function FAQ() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is SpeaQ AI?",
      answer:
        "SpeaQ AI is an AI-powered interview preparation platform that helps users practice mock interviews, receive instant feedback, and improve their chances of landing their dream job.",
    },
    {
      question: "How does the AI interview process work?",
      answer:
        "Once you upload your resume and start a mock interview, our AI will generate tailored interview questions. Your responses are analyzed in real-time using voice and facial recognition to provide insights on confidence, clarity, and gaze tracking.",
    },
    {
      question: "Do I need to create an account to use SpeaQ AI?",
      answer:
        "Yes, you need to create an account to access personalized mock interviews, save progress, and receive feedback. However, you can explore basic features without signing up.",
    },
    {
      question: "Is my data secure on SpeaQ AI?",
      answer:
        "Absolutely! We prioritize user privacy and ensure that your data, including video recordings and personal information, is securely stored and never shared with third parties.",
    },
    {
      question: "Can I practice interviews for different job roles?",
      answer:
        "Yes! SpeaQ AI supports multiple industries, including tech, finance, healthcare, and management. You can select a specific role to get customized interview questions.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-gray-300 ">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-md">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition duration-300"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <span className="text-blue-400 text-xl">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="p-4 text-gray-700"
              >
                {faq.answer}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
