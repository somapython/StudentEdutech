import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const Toaster = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const icon = {
    success: <FaCheckCircle className="text-white" />,
    info: <FaInfoCircle className="text-white" />,
    danger: <FaTimesCircle className="text-white" />,
  };

  const bgColor = {
    success: "bg-green-500",
    info: "bg-blue-500",
    danger: "bg-red-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 max-w-xs px-4 py-2 rounded-md shadow-lg flex items-center justify-between space-x-3 text-white ${bgColor[type]}`}
    >
      <div className="flex items-center space-x-2">
        <div>{icon[type]}</div>
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="absolute bottom-8 right-1 text-sm text-gray-300 hover:text-gray-100 focus:outline-none bg-transparent"
        style={{ padding: '0.2rem' }}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default Toaster;

