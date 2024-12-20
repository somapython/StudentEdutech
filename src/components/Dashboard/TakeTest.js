import React , {useState} from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal"; 
import { FaSpinner} from "react-icons/fa";
import testImage from '../../assets/Dashboard/test-8.jpg';
import { useNavigate } from "react-router-dom";

const TakeTest = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingNew, setLoadingNew] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 500);
  };

  const handleStartTest = () => {
    setModalOpen(true); 
  };

  const handleAcceptAndStartTest = () => {
    setModalOpen(false); 
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/test"); 
    }, 500);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full mx-auto ">
            {loadingNew && (
                <div className="flex justify-center items-center my-4 w-[90vw] h-[90vh]">
                <FaSpinner className="text-indigo-500 text-4xl animate-spin" />
                </div>
            )}
            {!loadingNew && (
            <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 px-2 md:px-6 py-4 rounded-t-lg shadow-lg">
                <button
                    onClick={handleBack}
                    className="absolute left-6 md:left-16 text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
                >
                    &larr; Back
                </button>
                <h1 title={"Take a Test"} className="ml-20 md:ml-0 text-base md:text-3xl font-bold text-center text-white mb-0 md:mb-2">Take a Test</h1> 
                </div>
                )} 
     
                <p title={"Get ready to test your knowledge and skills. Good luck!"} className="mt-4 text-sm md:text-xl text-cyan-500 md:text-gray-700 flex items-center justify-center">
                    Get ready to test your knowledge and skills. Good luck!
                </p>
                <div className="flex flex-row px-2 md:px-16 gap-2 ">
                    <div title={"Get ready to test your knowledge and skills. Good luck!"} className="hidden md:flex space-y-4 w-[40%]">
                        <img src={testImage} className="w-[400px] h-[400px] rounded-lg border" />
                    </div> 
                    <div className="space-y-4 w-[100%] md:w-[60%]">
                        <div title={"Test Instructions"} className="bg-gray-50 p-4 rounded-lg border ">
                            <h2 className="text-lg font-semibold text-gray-800">Test Instructions:</h2>
                            <ul className="list-disc pl-6 text-gray-600 mt-2">
                                <li className="text-sm md:text-base">Total Questions: <span className="font-bold">10</span></li>
                                <li className="text-sm md:text-base">Time Limit: <span className="font-bold">15 minutes</span></li>
                                <li className="text-sm md:text-base">Score: <span className="font-bold">+4 for correct, -1 for incorrect</span></li>
                                <li className="text-sm md:text-base">All questions are multiple-choice.</li>
                                <li className="text-sm md:text-base">Once you start, the timer cannot be paused.</li>
                            </ul>
                        </div>
                        <div title={"Test Rules"} className="bg-gray-50 p-4 rounded-lg border">
                            <h2 className="text-lg font-semibold text-gray-800">Test Rules:</h2>
                            <ul className="list-disc pl-6 text-gray-600 mt-2">
                                <li className="text-sm md:text-base">Read all questions carefully.</li>
                                <li className="text-sm md:text-base">Ensure a stable internet connection.</li>
                                <li className="text-sm md:text-base">Click "Submit" only after completing the test.</li>
                                <li className="text-sm md:text-base">Test progress is monitored to ensure compliance with the rules.</li>
                                <li className="text-sm md:text-base">Multiple attempts to log in during the test will result in disqualification.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div title={" Start Test"} className="flex items-center justify-center">
                    <button onClick={handleStartTest}
                        className="mt-4 px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-500 font-semibold transition" >
                        Start Test
                    </button>
                </div>
                {isModalOpen && (
                    <PrivacyPolicyModal
                    onClose={() => setModalOpen(false)}
                    onAccept={handleAcceptAndStartTest}
                    />
                )}
                </div>
    </div>
  );
};

export default TakeTest;
