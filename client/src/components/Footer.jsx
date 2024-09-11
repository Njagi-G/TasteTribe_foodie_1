import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <footer
      className={`bg-customGreen text-white font-urbanist w-full fixed bottom-0 transition-all duration-300 ${
        isExpanded ? "h-auto" : "h-0"
      } z-50`}
    >
      <button
        onClick={toggleFooter}
        className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-customGreen text-white px-4 py-2 rounded-t-lg flex items-center focus:outline-none hover:bg-opacity-80 transition-colors duration-200"
      >
        {isExpanded ? (
          <FaChevronDown className="text-xl mr-2" />
        ) : (
          <FaChevronUp className="text-xl mr-2" />
        )}
        <span className="text-sm sm:text-base">
          {isExpanded ? "Click to collapse" : "Click to expand"}
        </span>
      </button>

      <div className="container mx-auto px-4 w-full">
        {isExpanded && (
          <div className="py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {/* Logo */}
              <div className="flex items-center justify-center sm:justify-start">
                <img
                  src="https://res.cloudinary.com/dud0jjkln/image/upload/v1723487640/1_fenfqx.jpg"
                  alt="TasteTribe Logo"
                  className="h-10 sm:h-12 mr-3"
                />
                <span className="text-xl sm:text-2xl font-bold">
                  TasteTribe
                </span>
              </div>

              {/* Navigation Links */}
              <div className="text-center sm:text-left">
                <ul className="flex flex-row justify-center sm:justify-start space-x-4 sm:space-x-6">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `text-sm sm:text-base ${
                          isActive
                            ? "border-b-2 border-red-500"
                            : "hover:text-gray-400 transition-colors duration-200"
                        }`
                      }
                    >
                      HOME
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/aboutus"
                      className={({ isActive }) =>
                        `text-sm sm:text-base ${
                          isActive
                            ? "border-b-2 border-red-500"
                            : "hover:text-gray-400 transition-colors duration-200"
                        }`
                      }
                    >
                      ABOUT US
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contactus"
                      className={({ isActive }) =>
                        `text-sm sm:text-base ${
                          isActive
                            ? "border-b-2 border-red-500"
                            : "hover:text-gray-400 transition-colors duration-200"
                        }`
                      }
                    >
                      CONTACT US
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center sm:justify-end space-x-4 sm:space-x-6">
                <a
                  href="https://www.tiktok.com/@tastetribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-black transition-colors duration-200"
                >
                  <FaTiktok size={28} />
                </a>
                <a
                  href="https://www.facebook.com/tastetribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaFacebook size={28} />
                </a>
                <a
                  href="https://www.instagram.com/tastetribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-pink-800 transition-colors duration-200"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://www.youtube.com/tastetribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-red-600 transition-colors duration-200"
                >
                  <FaYoutube size={28} />
                </a>
                <a
                  href="https://x.com/tastetribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-gray-800 transition-colors duration-200"
                >
                  <FaXTwitter size={28} />
                </a>
              </div>
            </div>

            {/* Copyright Notice */}
            <div className="text-center mt-8 text-sm sm:text-base">
              <p>
                ©️ {new Date().getFullYear()} TASTETRIBE. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
