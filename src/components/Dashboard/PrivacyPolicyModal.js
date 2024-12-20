import React, { useState } from "react";

const PrivacyPolicyModal = ({ onClose, onAccept }) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div title={"Privacy Policy"} className="bg-white rounded-lg shadow-lg max-w-md w-[90%] p-6">
        <h2 className="text-xl font-bold text-gray-800">Privacy Policy</h2>
        <p className="mt-4 text-gray-600">
          Please read and accept the privacy policy before starting the test.
        </p>
        <ul className="mt-4 text-gray-600 space-y-2 list-disc pl-6">
            <li className="text-sm md:text-base">Your personal information will be stored securely and used only for test purposes.</li>
            <li className="text-sm md:text-base">No third-party access to your data will be permitted without prior consent.</li>
            {/* <li className="text-sm md:text-base">Test responses and performance metrics may be analyzed for improving the testing system.</li> */}
            <li className="text-sm md:text-base">Internet usage may be monitored to ensure compliance with test rules.</li>
            <li className="text-sm md:text-base">By accepting, you agree to abide by the rules and ensure the authenticity of your responses.</li>
            <li className="text-sm md:text-base">You have the right to request the deletion of your data after the test is completed.</li>
        </ul>
        <div className="mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-600">I accept all the terms and conditions.</span>
          </label>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button title={"Cancel"}
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button title={"Start Test"}
            onClick={onAccept}
            disabled={!isChecked}
            className={`px-4 py-2 text-white rounded-lg ${
              isChecked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;