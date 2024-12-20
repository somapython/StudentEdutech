import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mathsImage from "../../assets/Home/maths.jpg";
import gkImage from "../../assets/Home/gk.jpg";
import historyImage from "../../assets/Home/history.jpg";
import scienceImage from "../../assets/Home/science.jpg";
import marathiImage from "../../assets/Home/marathi.jpg"
import mathsVideo from "../../assets/Home/video/maths.mp4";
import scienceVideo from "../../assets/Home/video/science.mp4";
import gkVideo from "../../assets/Home/video/gk.mp4";
import historyVideo from "../../assets/Home/video/history.mp4";
import marathiVideo from "../../assets/Home/video/marathi.mp4";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categoryDetails = {
    mathematics: {
      image: mathsImage,
      description: "Mathematics is the science of numbers, equations, and shapes.",
      video: mathsVideo,
      bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-300",
    },
    "general knowledge": {
      image: gkImage,
      description: "General Knowledge enhances your awareness about the world.",
      video:  gkVideo,
      bgColor: "bg-gradient-to-br from-green-100 to-green-300",
    },
    मराठी: {
      image: marathiImage,
      description: "Marathi enhances your knowledge about the lessons and poet.",
      video:  marathiVideo,
      bgColor: "bg-gradient-to-br from-purple-100 to-cyan-300",
    },
    history: {
      image: historyImage,
      description: "History teaches us about past events and their significance.",
      video:  historyVideo,
      bgColor: "bg-gradient-to-br from-red-100 to-red-300",
    },
    science: {
      image: scienceImage,
      description: "Science helps us understand the natural world through experiments.",
      video:  scienceVideo,
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-300",
    },
  };

  const { image, description, video, bgColor } = categoryDetails[categoryName] || {
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-300",
  };

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  };

  const handleLogin = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col items-center justify-center p-4`}>
      {/* Header Row */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-3 md:mb-6">
        {/* <button
          className="bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm md:text-base"
          onClick={handleBack}
        >
          Back
        </button> */}
        <button
          onClick={handleBack}
          className="text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
        >
          &larr; Back
        </button>
        <h1 title ={categoryName} className="border border-blue-600 bg-white text-blue-600 px-4 py-2 rounded-lg text-lg md:text-xl font-bold capitalize shadow-sm">
          {categoryName || "Category"}
        </h1>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center">
        {/* Image */}
        {image && (
          <img
            src={image}
            alt={categoryName}
            title ={categoryName}
            className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-lg shadow-lg"
          />
        )}

        {/* Description and Video */}
        <div className="flex-1">
          {description && (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-6 rounded-lg shadow-md mb-4">
              <p className="text-sm md:text-base text-gray-800 text-center font-medium" title ={description}>
                {description}
              </p>
            </div>
          )}
          {video && (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 md:p-4 rounded-lg shadow-md">
              <video
                controls 
                title ={description}
                className="w-full rounded-md shadow-lg"
                style={{ maxHeight: "240px" }}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}

      {/* Login Button */}
      <button title ={'Please Login to Take the Test'}
        className="mt-2 md:mt-4 bg-purple-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-purple-600 transition text-sm md:text-base"
        onClick={handleLogin}
      >
        {loading ? "Loading..." : "Please Login to Take the Test"}
      </button>
    </div>
  );
};

export default CategoryPage;
