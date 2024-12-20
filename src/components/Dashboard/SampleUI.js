import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './TestUI.css';
import Confetti from "react-confetti";
import timerAudio from "../../assets/Dashboard/Audio/timer.wav";
import nextClickAudio from "../../assets/Dashboard/Audio/next.wav";
import congratsAudio from "../../assets/Dashboard/Audio/congrats.wav";
import timeUp from "../../assets/Dashboard/Audio/TimeUp.mp3";
import { useAuthContext  } from "../Context/AuthContext";
import { FaCannabis, FaEnvira, FaFeatherAlt, FaFlask, FaCheck, FaPowerOff, FaCog, FaDisease, FaRedo, FaCanadianMapleLeaf, FaCentos, FaBahai, FaChessQueen, FaChessRook} from "react-icons/fa";

const SampleUI = () => {
  const totalTestTime = 5 * 60;
  const navigate = useNavigate();
  sessionStorage.clear();
  localStorage.removeItem("count");
  localStorage.removeItem("timeLeft");
  localStorage.removeItem("currentQuestionIndex");
  localStorage.removeItem("answers");
  localStorage.removeItem("correctAnswersCount");
  // localStorage.clear();
  const questions = [
    {
      id: 1,
      question: "What is the plural of 'child'?",
      options: ["Childs", "Children", "Childrens", "Child's"],
      correct: "Children",
    },
    {
      id: 2,
      question: "Identify the noun in this sentence: 'The cat sat on the mat.'",
      options: ["Cat", "Sat", "On", "The"],
      correct: "Cat",
    },
    {
      id: 3,
      question: "खालीलपैकी कोणते प्राणी वाघाचे मुख्य भक्ष्य आहे?",
      options: ["गाय", "हरण", "कावळा", "मांजर"],
      correct: "हरण",
    },
    {
      id: 4,
      question: "मराठी भाषेतील तीन मूळ स्वर कोणते आहेत?",
      options: ["अ, आ, इ", "अ, आ, ऊ", "अ, आ, ई", "अ, आ, उ"],
      correct: "अ, आ, इ",
    },
    {
      id: 5,
      question: "What is the sum of 45 and 37?",
      options: ["82", "72", "83", "80"],
      correct: "82",
    },
    {
      id: 6,
      question: "If a triangle has sides of length 3 cm, 4 cm, and 5 cm, what type of triangle is it?",
      options: ["Equilateral", "Isosceles", "Right-angled", "Scalene"],
      correct: "Right-angled",
    },
    {
      id: 7,
      question: "What is the boiling point of water at sea level?",
      options: ["90°C", "100°C", "120°C", "110°C"],
      correct: "100°C",
    },
    {
      id: 8,
      question: "Which part of the plant makes food?",
      options: ["Root", "Stem", "Leaf", "Flower"],
      correct: "Leaf",
    },
    {
      id: 9,
      question: "If today is Wednesday, what day will it be after 15 days?",
      options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      correct: "Thursday",
    },
    {
      id: 10,
      question: "Arrange these numbers in ascending order: 85, 34, 56, 21.",
      options: ["21, 34, 56, 85", "85, 56, 34, 21", "34, 21, 56, 85", "56, 21, 34, 85"],
      correct: "21, 34, 56, 85",
    },
  ];
  const [timeLeft, setTimeLeft] = useState(() => {return parseInt(localStorage.getItem("timeLeft")) || totalTestTime;});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {return parseInt(localStorage.getItem("currentQuestionIndex")) || 0;});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState(() => {return JSON.parse(localStorage.getItem("answers")) || {};});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [exitShowModal, setExitShowModal] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const { quizData } = useAuthContext();
  const [correctAnswersCount, setCorrectAnswersCount] = useState(() => {
    return parseInt(localStorage.getItem("correctAnswersCount")) || 0;
  });

  const nextAudio = new Audio(nextClickAudio); 
  useEffect(() => {
    if (!examFinished) {
      localStorage.setItem("timeLeft", timeLeft);
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
      localStorage.setItem("answers", JSON.stringify(answers));
    }
  }, [timeLeft, currentQuestionIndex, answers, examFinished]);

  useEffect(() => {
    const isPageRefreshed = sessionStorage.getItem("pageRefreshed");
    let count = parseInt(localStorage.getItem("count")) || 0;
    if (!isPageRefreshed) {
      sessionStorage.setItem("pageRefreshed", "true");
    } else if (isPageRefreshed === "true" && count === 0) {
      count = 1;
      localStorage.setItem("count", count);
    } else {
      setShowErrorModal(true);   
    }
  }, []);

  // useEffect(() => {
  //   // console.log("Questuin Data",questions);
  //   // console.log("Quiz Data",quizData);
  //   if (quizData.length > 0) {
  //     setQuestions(quizData);
  //   }
  // }, [quizData]);
  
  const handleNext = () => {
    nextAudio.play();
    if (selectedAnswer) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer === questions[currentQuestionIndex].correct,
      }));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleFinish = () => {
    setShowModal(true);
    if (selectedAnswer) {
        setAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: selectedAnswer === questions[currentQuestionIndex].correct,
        }));
      }
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      }
  };

  const congratsNewAudio = new Audio(congratsAudio);
  const confirmFinish = () => {
    const storedProfile = JSON.parse(localStorage.getItem("users")) || [];
  const loginMobileNo = JSON.parse(localStorage.getItem("loggedInMobileNo"));
  
  // Find logged-in profile using mobile number
  const loggedInProfile = storedProfile.find(
    (user) => user.mobileNo === loginMobileNo
  );

  if (!loggedInProfile) {
    console.error("User not found!");
    return; 
  }
    const correctCount = Object.values(answers).filter((isCorrect) => isCorrect).length;
    
    const totalCount = Object.keys(questions).length; 
    const name = loggedInProfile.name; 
    const mobileNo = loginMobileNo;
    const date = new Date().toLocaleString();

  const csvData = [
    [name, mobileNo, date, correctCount, totalCount]
  ];

  // Convert data to CSV format
  const csvContent = csvData.map(row => row.join(",")).join("\n");

  // Retrieve the existing CSV content from localStorage
  const existingCsv = localStorage.getItem("examResultsCSV") || "";

  // Check if the CSV content already has headers, if not, add them
  const headers = "Name,Mobile No,Date,Correct Answers Count,Total Questions";

  // Append new result to existing CSV or start with headers if nothing exists
  const newCsvContent = existingCsv ? `${existingCsv}\n${csvContent}` : `${headers}\n${csvContent}`;

  // Save updated CSV back to localStorage
  localStorage.setItem("examResultsCSV", newCsvContent);
    congratsNewAudio.play();
    setCorrectAnswersCount(correctCount);
    localStorage.setItem("correctAnswersCount", correctCount);
    setShowModal(false);
    setExamFinished(true);
    setExitShowModal(false);
    // localStorage.clear(); 
    setTimeout(() => {
      setLoading(true);
        navigate("/loading");
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard");
        }, 1000);
    }, 15000);
  };

 const handleDashboard=() => {
  setLoading(true);
  navigate("/loading");
  setTimeout(() => {
    setLoading(false);
    navigate("/dashboard");
  }, 1000);
  }

  const confirmOk =() =>{
    setShowTimeUpModal(false);
    confirmFinish();
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const timeAudio = new Audio(timerAudio);
    const timeAudioTimeUp = new Audio(timeUp);
  useEffect(() => {
    if (timeLeft === 31) {
      timeAudio.play();
    }
    if (timeLeft > 0 && !examFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } 
    else if (timeLeft === 0) {
      timeAudioTimeUp.play();
      setExitShowModal(false);
      setShowTimeUpModal(true); 
      setTimeout(()=>{
            setShowTimeUpModal(false);
            confirmOk(); 
      },8000)
    }
  }, [timeLeft, examFinished]);

  const exitButtonClick =()=>{
    setExitShowModal(true);
  }

  const handleCloseExitModal =()=>{
    setExitShowModal(false);
  }

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/payment");
    }, 500);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const correctAnswersCountNew = Object.keys(answers).reduce((count, index) => {
    const question = questions[index];
    return question && answers[index] === question.correct ? count + 1 : count;
  }, 0);

  if (examFinished) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <div title={"Congratulations"} className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center animate-fade-in">
          <div className="mb-4">
            <FaCheck className="mx-auto text-5xl text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Congratulations! 🎉
          </h1>
          <p className="mt-4 text-gray-600">
            You have successfully completed the exam.
          </p>
          <p className="mt-2 text-lg font-bold text-blue-600">
            Total Answers:  {questions.length}
          </p>
          <p className="mt-2 text-lg font-bold text-green-600">
            Attempted Questions:  {Object.keys(answers).length}
          </p>
          <p className="mt-2 text-lg font-bold text-red-600">
            Unattempted Questions: {questions.length - Object.keys(answers).length}
          </p>
          {/* <p className="mt-2 text-lg font-bold text-green-600">
            Correct Answers: {correctAnswersCount} / {questions.length}
          </p> */}
          <div className="mt-6">
            <button title={"Go to Dashboard"}
             onClick={handleDashboard}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              Go to Dashboard
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex flex-row w-full max-w-5xl"> 
      <div className="top-6 left-4 pr-[10px] md:px-auto md:top-6 md:left-10 flex">
        <button
          onClick={exitButtonClick}
          title = {"Exit"}
          className="text-white text-xs md:text-base font-semibold rounded-lg transition bg-green-500 hover:bg-green-600 w-[90px] md:w-[150px]"
        >
        Exit Test
        </button>
      </div> 
      <div className="bg-blue-100 w-full max-w-3xl text-center py-4 rounded-lg shadow-md">
        <h2 title={`Time Remaining: ${formatTime(timeLeft)}`} className="text-lg md:text-2xl font-bold text-red-500">{`Time Remaining: ${formatTime(timeLeft)}`}</h2>
      </div>
    </div>
      {/* Question Section */}
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-4 mt-4 mx-auto">
        {/* left Icon */}
        <div className="hidden md:flex absolute md:top-1/5 md:right-48 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-green-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaEnvira className="text-base md:text-2xl" /> 
            </div>
        </div>
        <div className="hidden md:flex absolute md:top-1/3 md:right-32 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-red-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaCentos className="text-base md:text-2xl" /> 
            </div>
        </div>
        <div className="absolute top-1/5 md:top-1/2 right-10 md:right-20 transform -translate-y-1/2 -translate-x-1/2 text-blue-600 animate-bounce">
            <div className="bg-cyan-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaChessQueen className="text-base md:text-2xl" /> 
            </div>
        </div>
        <div className="hidden md:flex absolute md:top-2/3 md:right-32 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-purple-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaChessRook className="text-base md:text-2xl" /> 
            </div>
        </div>
        <div className="hidden md:flex absolute md:top-3/4 md:right-56 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-orange-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaCog className="text-base md:text-2xl" /> 
            </div>
        </div>

      {/* Right Icon */}
        <div className="hidden md:flex absolute md:top-1/5 md:left-48 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-violet-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaFeatherAlt className="text-base md:text-2xl" /> 
            </div>
        </div>
        <div className="hidden md:flex absolute md:top-1/3 md:left-32 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-yellow-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaDisease className="text-base md:text-2xl" /> 
            </div>
        </div>
        <div className="absolute top-1/5 md:top-1/2 left left-10 md:left-20 transform -translate-y-1/2 translate-x-1/2 text-blue-600 animate-bounce">
            <div className="bg-pink-500 text-white  p-2 md:p-3 rounded-full shadow-md">
                <FaBahai className="text-base md:text-2xl" />
            </div>
        </div>
        <div className="hidden md:flex absolute md:top-2/3 md:left-32 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-blue-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaFlask className="text-base md:text-2xl" /> 
            </div>
        </div>
        <div className="hidden md:flex absolute md:top-3/4 md:left-56 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
            <div className="bg-gray-500 text-white p-2 md:p-3 rounded-full shadow-md">
                <FaCanadianMapleLeaf className="text-base md:text-2xl" /> 
            </div>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">Test Interface</h1>
        <div>
          <h2 className="text-base font-medium text-gray-800 mb-2">
            {`Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index}
                className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-blue-50" >
                <input type="radio" name="answer" value={option}
                  checked={selectedAnswer === option} onChange={() => setSelectedAnswer(option)}
                  className="w-4 h-4 cursor-pointer" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-2 md:mt-4 flex justify-end space-x-2 md:space-x-4">
          {currentQuestionIndex < questions.length - 1 ? (
            <button title={"Next"} onClick={handleNext} disabled={!selectedAnswer}
              className={`px-2 md:px-4 py-2 text-sm md:text-lg text-white rounded-lg ${
                selectedAnswer ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed" }`} >
              Next
            </button>
          ) : (
            <button title={"Finish"} onClick={handleFinish}
              className="px-4 py-2 text-white rounded-lg bg-green-600 hover:bg-green-700" >
              Finish
            </button>
          )}
        </div>
    </div>
        <div className="flex justify-center items-center space-x-1 md:space-x-2 mt-2 md:mt-4  w-full">
        {questions.map((_, index) => {
            const isCurrent = currentQuestionIndex === index;
            const isAttempted = answers[index] !== undefined;
            const circleColor = isCurrent
            ? "bg-blue-600"
            : isAttempted
            ? "bg-green-500"
            : "bg-gray-400";

            return (
            <div
                key={index}
                onClick={() => {setCurrentQuestionIndex(index)
                  const nextClickAudioNew = new Audio(nextClickAudio); 
                  nextClickAudioNew.play();
                }}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs md:text-lg md:font-bold cursor-pointer ${circleColor}`}
                title={index + 1}
            >
                {index + 1}
            </div>
            );
        })}
        </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div title={"Submit the Exam"} className="bg-white rounded-lg shadow-lg w-[90%] md:max-w-sm md:w-full p-6">
            <div className="mb-4">
                <FaCannabis className="mx-auto text-4xl text-green-500 animate-spin" />
              </div>
            <h2 className="text-lg font-bold text-gray-800">
              Do you want to submit the exam?
            </h2>
            <div className="mt-4 flex justify-end space-x-4">
              <button title={"Cancel"}
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button title={"Submit"}
                onClick={confirmFinish}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Error Modal */}
       {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div title={"Page refresh Error"} className="bg-white rounded-lg shadow-lg w-[90%] md:max-w-sm md:w-full p-6">
            <div className="mb-4">
                <FaRedo  className="mx-auto text-4xl text-blue-500 animate-spin" />
              </div>
            <h2 className="text-lg font-bold text-gray-800">
              Page refresh detected. Do you want to submit the exam?
            </h2>
            <div className="mt-4 flex justify-end space-x-4">
              <button title={"Cancel"}
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button title={"Submit"}
                onClick={confirmFinish}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showTimeUpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div title={"Time Complete"} className="bg-white rounded-lg shadow-lg w-[90%] md:max-w-sm md:w-full p-6 animate-fade-in-down">
            <div className="text-center">
              <div className="mb-4">
                <FaCog className="mx-auto text-4xl text-red-500 animate-spin" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                  Your Time is Complete.
              </h2>
              <p className="mt-2 text-gray-600">
                  Your allotted time for the exam has ended.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <button title={"OK"}
                onClick={confirmOk}
                className="px-6 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {exitShowModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div title={"Submit the Exam"} className="bg-white rounded-lg shadow-lg w-[90%] md:max-w-sm md:w-full p-6">
            <div className="mb-4">
                <FaPowerOff  className="mx-auto text-4xl text-red-500 animate-spin" />
              </div>
            <h2 className="text-lg font-bold text-gray-800">
              Do you want to really exit the test?
            </h2>
            <div className="mt-4 flex justify-end space-x-4">
              <button title={"Cancel"}
                onClick={handleCloseExitModal}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button title={"Submit"}
                onClick={handleBack}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleUI;
