import React, { useState } from 'react';
import AboutIcon from "../../assets/About/About.jpg";
import { useNavigate } from "react-router-dom";
import { FaMarker } from 'react-icons/fa';

const AboutUs = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => {
        setLoading(true);
        navigate("/loading");
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 500);
      };
      return (
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                <div className="absolute top-4 left-4">
                    <button onClick={handleBack}  title={"back"}  className="text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition" >
                        &larr; Back
                    </button>
                </div>
                <div className="container mx-auto px-6 py-4 md:py-16">
                    <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">About Us</h1>
                    <div title={"This is Description of About Us Page"} className="flex flex-col md:flex-row items-center" >
                        <img src={AboutIcon}  alt="About Us" className="rounded-lg shadow-lg max-w-full h-auto w-full md:w-1/2 mb-6 md:mb-0 md:mr-6 object-contain transform hover:scale-105 transition-transform duration-500" />
                    <div>
                    <p title={"Description"} className="text-base md:text-lg leading-relaxed mb-6" >
                        Welcome to our platform! We are dedicated to providing the best
                        services with an emphasis on quality and innovation. Our team works
                        tirelessly to ensure a seamless experience for our users.
                    </p>
                    <button title={"Learn More"} className="bg-white text-gray-500 flex flex-row px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-300" >
                        <FaMarker className="text-xl text-red-500 mr-1" /> Learn More
                    </button>
                </div>
            </div>
                </div>
            </div>
            );
};

export default AboutUs;
