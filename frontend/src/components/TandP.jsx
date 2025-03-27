import React from "react";
import { useEffect } from 'react';


export default function TermsAndPolicy() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-slate-200">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Terms and Policy
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          Welcome to SpeaQ AI. By accessing and using our platform, you agree to comply with our terms of service and privacy policy. Please read the following terms carefully.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">2. User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          - You must provide accurate and complete information when signing up.  
          - You are responsible for maintaining the confidentiality of your account.  
          - Misuse of our platform, including unauthorized access and data scraping, is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Data Privacy</h2>
        <p className="text-gray-700 mb-4">
          - We respect your privacy and ensure that your personal data is securely stored.  
          - Your recorded mock interview sessions are used only for feedback purposes and will not be shared with third parties.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Prohibited Activities</h2>
        <p className="text-gray-700 mb-4">
          - You may not use the platform for illegal activities.  
          - AI-generated feedback should not be considered as professional career advice.  
          - Any attempt to disrupt or manipulate the AI system will result in account suspension.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          - We reserve the right to modify these terms at any time.  
          - Users will be notified of significant changes via email or platform notifications.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Contact Information</h2>
        <p className="text-gray-700">
          If you have any questions or concerns regarding our Terms and Policy, please contact us at  
          <span className="text-blue-500 font-semibold"> support@speaqai.com</span>.
        </p>
      </div>
    </div>
  );
}
