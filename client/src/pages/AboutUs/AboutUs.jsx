import React from "react";
import { FaRocket, FaLightbulb, FaGlobe } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen p-8 font-urbanist bg-gradient-to-b from-backgroundGreen to-green-100">
      <section className="flex flex-col md:flex-row justify-around mb-20 space-y-8 md:space-y-0 md:space-x-6">
        <div className="bg-white p-10 rounded-2xl text-center shadow-2xl transform hover:scale-105 transition-all duration-300 w-full md:w-1/3 hover:shadow-3xl">
          <FaRocket className="text-6xl text-yellow-500 mb-8 mx-auto animate-bounce" />
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Mission</h2>
          <p className="text-gray-600 text-lg">
            Embark on a culinary adventure with our Recipe Sharing App, where
            every dish is a new horizon to explore.
          </p>
        </div>
        <div className="bg-white p-10 rounded-2xl text-center shadow-2xl transform hover:scale-105 transition-all duration-300 w-full md:w-1/3 hover:shadow-3xl">
          <FaLightbulb className="text-6xl text-green-500 mb-8 mx-auto animate-pulse" />
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Vision</h2>
          <p className="text-gray-600 text-lg">
            Uniting flavors globally, inspiring culinary creativity, and
            fostering connections through the joy of shared recipes.
          </p>
        </div>
        <div className="bg-white p-10 rounded-2xl text-center shadow-2xl transform hover:scale-105 transition-all duration-300 w-full md:w-1/3 hover:shadow-3xl">
          <FaGlobe className="text-6xl text-red-500 mb-8 mx-auto animate-spin-slow" />
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Culture</h2>
          <p className="text-gray-600 text-lg">
            Cultivating a vibrant community where culinary creativity flourishes
            and every shared recipe narrates a unique story.
          </p>
        </div>
      </section>

      <section className="text-center mt-24">
        <h1 className="text-6xl font-extrabold mb-12 text-gray-800 animate-fade-in-down">
          Welcome to TasteTribe
        </h1>
        <p className="text-2xl mb-16 text-gray-700 max-w-4xl mx-auto leading-relaxed">
          From seasoned chefs to kitchen novices, TasteTribe is your gateway to
          exploring new flavors, sharing beloved dishes, and connecting with
          fellow food enthusiasts in a global culinary community.
        </p>
        <div className="flex flex-col md:flex-row justify-around space-y-8 md:space-y-0 md:space-x-6">
          <img
            src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVjaXBlJTIwc2hhcmluZyUyMGFmcmljYW58ZW58MHx8MHx8fDA%3D"
            alt="Cooking 1"
            className="w-full md:w-1/3 h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1663045208084-fe40c38ad234?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cooking 2"
            className="w-full md:w-1/3 h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1661507070247-1ed0a6ed3ca2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlY2lwZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Cooking 3"
            className="w-full md:w-1/3 h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
