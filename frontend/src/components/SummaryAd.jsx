import { motion } from "framer-motion";
import { useState } from "react";


export default function SummaryAd() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
       <button
        className="absolute top-2 right-2 text-white text-lg font-bold focus:outline-none"
        onClick={() => setIsVisible(false)}
      >
        ✖
      </button>
      <h3 className="text-lg font-bold">AI Interview Platform</h3>
      <p className="text-sm">
        Enhance your interview skills with AI-powered feedback and real-time mock interviews.
      </p>
    </motion.div>
  );
}