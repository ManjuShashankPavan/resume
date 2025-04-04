import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 w-full mt-auto">
      <div className="max-w-6xl mx-auto px-4 mt-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-center md:text-left">
            AI Interview Training
          </h1>
          <div className="flex mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-white text-gray-900 px-3 py-1 rounded-l-md outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-1 rounded-r-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          {/* Company Section */}
          <div>
            <h4 className="text-md font-semibold mb-2">Company</h4>
            <ul className="text-gray-400 space-y-1">
              <li>
                <Link to="/About" className="hover:text-gray-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/Careers" className="hover:text-gray-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-md font-semibold mb-2">Resources</h4>
            <ul className="text-gray-400 space-y-1">
              <li>
                <Link to="/FAQs" className="hover:text-gray-200">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/Support" className="hover:text-gray-200">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-md font-semibold mb-2">Legal</h4>
            <ul className="text-gray-400 space-y-1">
              <li>
                <Link to="/TandP" className="hover:text-gray-200">
                  Terms and Policy
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className="hover:text-gray-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} InterviewAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
