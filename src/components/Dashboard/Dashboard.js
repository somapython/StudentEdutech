import React , {useState} from "react";
import { useAuthContext  } from "../Context/AuthContext";
import './Dashboard.css';
import { FaUserCircle, FaCalendarAlt, FaClipboardList, FaArrowLeft , FaSpinner, FaBookReader, FaAtom } from "react-icons/fa";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";

const Dashboard = ({onLogout }) => {
  const { isLoggedIn,isAdminLoggedIn } = useAuthContext ();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //console.log("2222",isLoggedIn,isAdminLoggedIn)
  const handleLogin = () => {
    navigate("/loading");
      setTimeout(() => {
        navigate("/login"); 
      }, 500); 
    } 
  const accuracyData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const brainIqData = {
    labels: ["High IQ", "Average IQ", "Low IQ"],
    datasets: [
      {
        data: [50, 40, 10],
        backgroundColor: ["#2196f3", "#ffeb3b", "#f44336"],
      },
    ],
  };

  const difficultyData = {
    labels: ["Easy", "Moderate", "Hard"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };
  // const view = ["viewProfile", "upcomingExams", "previousResults", "takeTest"];

  const handleNavigate = (view) => {
    if (view === "takeTest") {
      setLoading(true);
      navigate("/loading"); 
      setTimeout(() => {
        setLoading(false);
        navigate("/payment");
      }, 1000);    
    } else {
      setLoading(true);
      navigate("/loading"); 
      setTimeout(() => {
        setLoading(false);
        navigate(`/dashboard/${view.toLowerCase()}`);
      }, 1000); 
    } 
  };

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  };

  const startLogin = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      handleLogin();
      navigate("/login");
    }, 1000); 
  };
  if ((isLoggedIn || isAdminLoggedIn)) {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-pink-100 p-2 sm:p-4">
        <header title ={'Student Dashboard'} className="relative bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 shadow p-4 sm:p-4 rounded mb-2">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-1/3 left-2 sm:left-4 text-white hover:underline text-xs sm:text-sm md:text-base font-semibold px-2 sm:px-3 py-1 rounded"
            >
                &larr; Back
            </button>
            <h1 className="text-center text-base sm:text-3xl font-bold text-white">
                Student Dashboard
            </h1>
        </header>
      {/* Take a Test Section */}
      <section className="mt-2 bg-gradient-to-r from-green-100 via-blue-200 to-purple-200 shadow rounded p-4 sm:p-2 flex flex-row items-center justify-between">
        <div title={"Ready to take a test"}>
          <h2 className="text-sm sm:text-lg font-semibold text-blue-700">
            Ready to take a test?
          </h2>
          <p className="mt-1 text-xs sm:text-base text-gray-600">
            Start practicing now to improve scores!
          </p>
        </div>
        <button title ={'Take a Test'} onClick={() => handleNavigate("takeTest")} className="mt-0 text-sm sm:text-base px-2 py-1 sm:px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 font-semibold transform hover:scale-105 hover:shadow-lg transition">
          Take a Test
        </button>
      </section>

      {/* Cards Section */}
      <main className="hidden mt-4 sm:mt-2 sm:grid grid-cols-3 gap-2">
        {/* Your Profile */}
        <div onClick={() => handleNavigate("viewProfile")} title ={'Your Profile'} className="cursor-pointer bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 shadow rounded p-2 flex flex-col sm:flex-row items-center transform hover:scale-105 hover:shadow-lg transition">
          <FaUserCircle className="text-2xl sm:text-3xl text-purple-500 mr-2" />
          <div className="mt-4 sm:mt-0">
            <h2 className="text-xs sm:text-sm font-semibold title">Your Profile</h2>
            <p className="hidden sm:flex text-xs text-gray-600">View and update your details.</p>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div onClick={() => handleNavigate("upcomingExams")} title ={'Upcoming Exams'} className="cursor-pointer bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 shadow rounded p-2 flex flex-col sm:flex-row items-center transform hover:scale-105 hover:shadow-lg transition">
          <FaCalendarAlt className="text-2xl sm:text-3xl text-blue-500 mr-2" />
          <div className="mt-4 sm:mt-0">
            <h2 className="text-xs sm:text-sm font-semibold flex items-center justify-center title" >Upcoming Exams</h2>
            <p className="hidden sm:flex text-xs text-gray-600">Check your exam schedule.</p>
          </div>
        </div>

        {/* Previous Results */}
        <div onClick={() => handleNavigate("previousResults")} title ={'Previous Results'} className="cursor-pointer bg-gradient-to-r from-green-100 via-purple-100 to-blue-100 shadow rounded p-2 flex flex-col sm:flex-row items-center transform hover:scale-105 hover:shadow-lg transition">
          <FaClipboardList className="text-2xl sm:text-3xl text-green-500 mr-2" />
          <div className="mt-4 sm:mt-0">
            <h2 className="text-xs sm:text-sm font-semibold title">
              Previous Results
            </h2>
            <p className="hidden sm:flex text-xs text-gray-600">Review your past performance.</p>
          </div>
        </div>
      </main>

      {/* Study Improvement Tips */}
      <section className="mt-4 sm:mt-2 bg-white shadow rounded p-2">
        <h2 className="text-sm sm:text-base font-semibold text-purple-700">
            Study Improvement Tips
        </h2>
        <div  className="mt-4 sm:mt-3 grid grid-cols-3 gap-4">
            {/* Card 1: Accuracy */}
            <div title ={'Accuracy'} className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-md p-2 sm:p-4 flex flex-col items-center">
                <h3 className="text-xs font-semibold text-gray-700 mb-1">Accuracy</h3>
                <div className="flex justify-center items-center mb-2 sm:mb-1">
                    <Chart
                    type="pie"
                    data={accuracyData}
                    options={{
                        plugins: {
                        tooltip: {
                            callbacks: {
                            label: (tooltipItem) => {
                                const value = tooltipItem.raw; // Get the value of the hovered slice
                                return `Accuracy: ${value}%`;
                            },
                            },
                        },
                        },
                        responsive: true, // Ensures it remains responsive
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                            position: "bottom", 
                            labels: {
                                font: {
                                size: 10, 
                                },
                            },
                            },
                        },
                    }}
                  className="w-[130px] h-[200px] sm:w-[180px] sm:h-[180px]"
                    />
                </div>
            </div>

            {/* Card 2: Brain IQ */}
            <div title ={'Brain IQ'} className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md p-2 sm:p-4 flex flex-col items-center">
                <h3 className="text-xs font-semibold text-gray-700 mb-1">Brain IQ</h3>
                <div className="flex justify-center items-center mb-2 sm:mb-1">
                    <Chart
                    type="pie"
                    data={brainIqData}
                    options={{
                        plugins: {
                        tooltip: {
                            callbacks: {
                            label: (tooltipItem) => {
                                const value = tooltipItem.raw; // Get the value of the hovered slice
                                return `Brain IQ: ${value}`;
                            },
                            },
                        },
                        },
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                            position: "bottom", // Optional: Place legend at the bottom
                            labels: {
                                font: {
                                size: 10, // Adjust legend font size
                                },
                            },
                            },
                        },
                    }}
                    className="w-[130px] h-[200px] sm:w-[180px] sm:h-[180px]"
                    />
                </div>
            </div>

            {/* Card 3: Difficulty Level */}
            <div title ={'Difficulty Level'}  className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg shadow-md p-2 sm:p-4 flex flex-col items-center">
                <h3 className="text-xs font-semibold text-gray-700 mb-1">Difficulty Level</h3>
            <div className="flex justify-center items-center mb-2 sm:mb-1">
                <Chart
                type="pie"
                data={difficultyData}
                options={{
                    plugins: {
                    tooltip: {
                        callbacks: {
                        label: (tooltipItem) => {
                            const value = tooltipItem.raw; // Get the value of the hovered slice
                            return `Difficulty: ${value}`;
                        },
                        },
                    },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                        position: "bottom", // Optional: Place legend at the bottom
                        labels: {
                            font: {
                            size: 10, // Adjust legend font size
                            },
                        },
                        },
                    },
                }}
               className="w-[130px] h-[200px] sm:w-[180px] sm:h-[180px]"
                />
            </div>
            </div>
        </div>
    </section>
    <div title ={'Scholarship Opportunities'}
  className="mt-4 sm:mt-2 bg-gradient-to-r from-yellow-100 via-green-100 to-blue-100 shadow-2xl rounded-xl p-3 sm:p-1 flex flex-col sm:flex-row items-center transform animate-gradient"
>
  <FaAtom size={20}
    className="text-3xl sm:text-xl text-cyan-500 mb-2 sm:mb-0 transform animate-spin-slow"
  />
  <div className="mx-0 sm:mx-4">
    <h2 className="text-lg sm:text-sm font-semibold text-gray-800 text-shadow-md transform animate-text-glow">Scholarship Opportunities</h2>
    <p className=" text-sm sm:text-xs text-gray-600 m-0">Explore available scholarship programs.</p>
  </div>
</div>
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 shadow p-2 sm:hidden flex justify-around">
    <button title ={'Profile'} 
        onClick={() => handleNavigate("viewProfile")}
        className="flex flex-col items-center text-white hover:text-gray-200"
    >
        <FaUserCircle className="text-xl" />
        <span className="text-xs">Profile</span>
    </button>
    <button title ={'Exams'} 
        onClick={() => handleNavigate("upcomingExams")}
        className="flex flex-col items-center text-white hover:text-gray-200"
    >
        <FaCalendarAlt className="text-xl" />
        <span className="text-xs">Exams</span>
    </button>
    <button title ={'Results'} 
        onClick={() => handleNavigate("previousResults")}
        className="flex flex-col items-center text-white hover:text-gray-200"
    >
        <FaClipboardList className="text-xl" />
        <span className="text-xs">Results</span>
    </button>
</footer>

    </div>
  );
}
 // if ((!isLoggedIn || !isAdminLoggedIn)) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 relative">
    {/* Back Button */}
    <button
      className="absolute top-2 left-2 md:top-5 md:left-5 text-sm base:text-lg flex items-center gap-2 px-2 md:px-4 py-2 bg-white text-indigo-600 font-semibold rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition-all duration-300"
      onClick={handleBack}
    >
      <FaArrowLeft className="text-base md:text-xl" />
      Back
    </button>

    {/* Header */}
    <h1 className="text-lg md:text-3xl font-bold text-indigo-800 mb-4 px-4 py-2 bg-black/30 rounded-xl shadow-lg">
      Welcome to the Student Test Portal
    </h1>

    {/* Sub-header */}
    <h2 className="text-lg text-indigo-600 font-medium mb-6">
      Online Platform for Student Testing
    </h2>

    {/* Animated Icon */}
    <div className="flex items-center justify-center mb-8">
      <FaBookReader className="text-4xl md:text-6xl text-indigo-600 animate-spin-slow" />
    </div>
    <h2 className="text-base md:text-2xl font-bold text-white bg-orange-500 px-4 py-2 rounded-xl animate-bounce shadow-lg">
        Please log in to access the dashboard
      </h2>
    {/* Description */}
    <p className="text-center text-gray-700 text-base md:text-lg p-2 max-w-xl mb-6 leading-relaxed">
      Prepare for success with our secure, easy-to-use platform designed for
      online test-taking, access your dashboard to view exams, track progress,
      and receive real-time feedback. Login now to start your journey with a seamless
      test-taking experience.
    </p>

    {/* Login Button */}
    <button
      title="Go to Login"
      className={`px-6 py-3 text-lg font-medium bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-green-500 transform hover:scale-110 transition-all duration-300 ${
        loading && "cursor-not-allowed"
      }`}
      onClick={startLogin}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <FaSpinner className="animate-spin text-xl" />
          Logging In...
        </div>
      ) : (
        "Go to Login"
      )}
    </button>
  </div>
  );
// }
};

export default Dashboard;
