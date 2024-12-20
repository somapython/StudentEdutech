// src/components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="loader"></div>
      <style >{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
