import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaClipboard, FaEnvelope, FaSignInAlt, FaUserShield,FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuthContext  } from "../Context/AuthContext";
import Toaster from "../Toaster";
import Confetti from "react-confetti";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import correctSound from "../../assets/Home/Audio/correct.mp3";
import incorrectSound from "../../assets/Home/Audio/incorrect-1.wav";
import './HomeSlick.css';
import examImage from "../../assets/Home/exam.png";
import logoIcon from "../../assets/Home/logo6.jpg";
import examImage1 from "../../assets/Home/exam-1.jpg";
import examImage2 from "../../assets/Home/exam-2.jpg";
import examImage3 from "../../assets/Home/exam-3.jpg";
import examImage4 from "../../assets/Home/exam-4.jpg";
import examImage5 from "../../assets/Home/exam-5.jpg";
import examImage7 from "../../assets/Home/exam-7.jpg";
import examImage9 from "../../assets/Home/exam-9.png";
import examImage15 from "../../assets/Home/exam-15.png";
import examImage16 from "../../assets/Home/exam-16.jpg";
import examImage17 from "../../assets/Home/exam-17.jpg";
import userIconImage from "../../assets/Dashboard/user.png";

const HomeScreen = () => {
  const { isLoggedIn,isAdminLoggedIn } = useAuthContext();
  const { logout,logoutAdmin } = useAuthContext ();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({});
  const [userIcon, setUserIcon] = useState(userIconImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [toaster, setToaster] = useState(null);
  const storedProfile = JSON.parse(localStorage.getItem("users")) || [];
  const loginMobileNo = JSON.parse(localStorage.getItem("loggedInMobileNo"));
  const loginProfileImage =  localStorage.getItem("profileImage");

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loggedInProfile = storedProfile.find((user) => user.mobileNo === loginMobileNo);

  let loggedInProfileName = "User";
  if(loginMobileNo!= null || loggedInProfile!= undefined || loginMobileNo!= undefined){
    loggedInProfileName = loggedInProfile.name;
  }else{
    loggedInProfileName = "User";
  }

  const handleOptionClick = (questionIndex, option, correctAnswer) => {
    const isAnswerCorrect = option === correctAnswer;
    setSelectedOption((prevState) => ({
      ...prevState,
      [questionIndex]: option,
    }));
    setShowConfetti(true);
    setIsCorrect(isAnswerCorrect);

    const audio = new Audio(isAnswerCorrect ? correctSound : incorrectSound);
    audio.play();

    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleCategoryClick = (category) => {
    navigate("/loading"); 
    setTimeout(() => {
      navigate(`/category/${category.toLowerCase()}`);
    }, 1000); 
    
  };

  const categories = ["Mathematics", "मराठी", "History", "Science"];

  const handleNavigation = (route) => {
    navigate("/loading");
    if (route === "/dashboard" && (!isLoggedIn || !isAdminLoggedIn)) {
        setTimeout(() => {
            navigate("/dashboard");
          }, 500); 
    } else {
      setTimeout(() => {
        navigate(route); 
      }, 500); 
    } 
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    logoutAdmin();
    localStorage.removeItem("loggedInMobileNo");
    navigate("/loading"); 
    setTimeout(() => {
      setToaster({ type: "success", message: "Logout Successfully" });
      navigate("/");
    }, 1000); 
    
  };

  const handleProfileUpdate = () => {
    setShowDropdown(false);
    setIsModalOpen(true);
  };

  const updateProfileData =(e) =>{
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setToaster({ type: "danger", message: "Please select a valid image file (jpg,png)." });
        e.target.value = ""; 
        return;
      }
      setSelectedImage(file); 
    } 
  }

  const updateProfileDataButton =()=>{
    if (selectedImage) {
    const reader = new FileReader();
    reader.onload = () => {
      setUserIcon(reader.result); 
      setIsModalOpen(false);
      setSelectedImage(null);
    };
    reader.readAsDataURL(selectedImage);
    setToaster({ type: "success", message: "Profile updated Successfully!" });
    }
    else {
      setToaster({ type: "danger", message: "Please choose an image to update your profile!" });
    }
  }

  const cancelProfileDataButton =()=>{
    setIsModalOpen(false);
    setSelectedImage(null);
  }

  const imageIcons = [
    { id: 1, image: examImage1, description: "Practice algebra, geometry, and arithmetic concepts." },
    { id: 2, image: examImage2, description: "Study physics, chemistry, and biology topics." },
    { id: 3, image: examImage3, description: "Enhance grammar, vocabulary, and comprehension skills." },
    { id: 4, image: examImage4, description: "Learn about historical events, timelines, and key figures." },
    { id: 5, image: examImage5, description: "Explore maps, landforms, and environmental studies." },
    { id: 6, image: examImage7, description: "Focus on coding, algorithms, and IT fundamentals." },
    { id: 7, image: examImage9, description: "Stay updated with current affairs and trivia." },
    { id: 8, image: examImage16, description: "Improve reading, writing, and grammar proficiency." },
    { id: 9, image: examImage17, description: "Develop language skills with grammar and literature." },
    { id: 10, image: examImage15, description: "Nurture drawing, painting, and design skills." },
  ];


  const sliderImageSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const demoQuestions = [
    {
      category: "Mathematics",
      question: "What is the value of (12 × 12) ÷ 4?",
      options: ["32", "36", "48", "72"],
      correct: "36",
    },
    {
      category: "General Knowledge",
      question: "Who is known as the Father of the Indian Constitution?",
      options: ["Mahatma Gandhi", "Dr. B. R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"],
      correct: "Dr. B. R. Ambedkar",
    },
    {
      category: "History",
      question: "In which year did India gain independence?",
      options: ["1945", "1946", "1947", "1948"],
      correct: "1947",
    },
    {
      category: "Science",
      question: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "CO2", "NaCl"],
      correct: "H2O",
    },
    {
      category: "मराठी",
      question: "‘भारत’ हा शब्द कोणत्या भाषेतून आलेला आहे?",
      options: ["संस्कृत", "हिंदी", "मराठी", "अंग्रेजी"],
      correct: "संस्कृत",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {showConfetti && (
        <Confetti
          numberOfPieces={isCorrect ? 300 : 100}
          gravity={0.1}
          colors={isCorrect ? ["#0f0", "#0ff"] : ["#f00", "#000"]}
          width={window.innerWidth}
          height={window.innerHeight}
          x={window.innerWidth / 2}
          y={200}
        />
      )}

      {/* Header */}
      <header className="flex justify-between items-center bg-blue-500 text-white px-4 py-1">
        <img src={logoIcon} title={"LogoIcon"} alt="LogoIcon" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-yellow-400" />
        <div className="block md:hidden flex-1 text-right">
               <h3 className="text-sm flex justify-end items-center">
                Welcome,
                <span className="font-bold animate-pulse overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] inline-block">
                  {loggedInProfileName}
                </span>{" "}
                <span className="inline-block animate-bounce text-xl">👋</span>
              </h3>
        </div>  
        <nav>
          <ul className="hidden md:flex items-center gap-6">
          {isAdminLoggedIn && (
          <li title ={"Admin"} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400" onClick={() => handleNavigation("/admin")}>
              <FaUserShield /> Admin
            </li>
          )}
            <li title ={"Dashboard"} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400" onClick={() => handleNavigation("/dashboard")}>
              <FaClipboard /> Dashboard
            </li>
            <li title ={"About"} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400" onClick={() => handleNavigation("/about")}>
              <FaInfoCircle /> About
            </li>
            <li title ={"Contact Us"} className="flex items-center gap-2 cursor-pointer hover:text-yellow-400" onClick={() => handleNavigation("/contact")}>
              <FaEnvelope /> Contact Us
            </li>
             <li title ={"Login"} className="relative">
              {(isLoggedIn || isAdminLoggedIn) ? (
                <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 bg-orange-600 text-white-500 hover:bg-orange-500 px-4 py-2 cursor-pointer rounded-lg font-semibold">
                  {/* <FaUser /> Profile <FaChevronDown /> */}
                  <img src={ userIcon} alt="Profile" title={'Profile'} className="w-10 h-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"/><FaChevronDown />
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 bg-yellow-400 text-blue-500 px-4 py-2 cursor-pointer rounded-lg font-semibold hover:bg-yellow-500 transition"
                  onClick={() => handleNavigation("/login")}
                >
                  <FaSignInAlt /> Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-initial md:flex-1 mt-2 md:mt-0 overflow-y-auto flex flex-col md:flex-row items-center justify-center px-2 md:px-4 gap-6 md:gap-20">
        {/* <div className="w-full md:w-1/2 flex justify-center">
          <img src={examImage} alt="Scholarship" className="w-48 md:w-64 lg:w-96 rounded-lg shadow-lg" />
        </div> */}
          <div className="w-80 h-36 md:w-80 md:h-60 lg:w-80 lg:h-96 relative">
            <Slider {...sliderImageSettings}>
              {imageIcons.map((imageData, index) => (
                <div key={index} className="w-full md:w-1/2">
                   <img src={imageData.image} alt="Scholarship" title={imageData.description} className="w-80 h-36 md:w-56 md:h-56 lg:w-80 lg:h-80 rounded-lg shadow-lg" /> 
                </div>
              ))}
            </Slider>
          </div>
        <div className="w-full md:w-1/2 flex flex-col items-start gap-2 gap-4 mt-2 md:mt-0">
          <h2 className="text-sm md:text-lg lg:text-xl font-bold text-blue-500 leading-tight">
            Prepare for the Scholarship Exam
          </h2>
          <ul className="grid grid-cols-4 gap-2 md:grid-cols-2 md:gap-4 w-full">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                title={category}
                className="text-xs md:text-lg lg:text-xl flex items-center justify-center bg-violet-700 text-rose-300 text-center py-2 md:py-2 rounded-lg font-semibold shadow-md cursor-pointer hover:bg-violet-900 transition"
              >
                {category}
              </li>
            ))}
          </ul>

          <div className="w-full mt-1 md:mt-4">
            <h2 className="text-sm md:text-lg lg:text-xl font-bold text-white mb-1 md:mb-4 bg-gradient-to-r from-red-400 to-red-500 p-2 rounded-lg shadow-lg text-center">
              🌟 Try These Demo Questions! 🌟
            </h2>
            <div className="w-[330px] sm:w-[600px] md:w-full">
            <Slider {...sliderSettings}>
              {demoQuestions.map((question, index) => (
                <div key={index} className="p-2 md:p-3 bg-emerald-400 rounded-lg shadow-md text-sm md:text-base h-50">
                  <h3 title={question.category} className="text-xs md:text-sm font-semibold text-purple-700">
                    {`${index + 1}. ${question.category}`}
                  </h3>
                  <p className="text-rose-600 mt-1 text-xs md:text-sm m-0">{question.question}</p>
                  <ul className="mt-2 text-gray-700 space-y-2 text-xs">
                    {question.options.map((option, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleOptionClick(index, option, question.correct)}
                        className={`flex justify-between cursor-pointer p-1 bg-gray-200 text-sky-600 rounded-md transition ${
                          selectedOption[index] === option
                            ? option === question.correct
                              ? "bg-green-400 text-white"
                              : "bg-red-400 text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <span title={option} className="text-xs md:text-sm lg:text-dm">{option}</span>
                        <span className="ml-2">
                          {selectedOption[index] === option &&
                            (option === question.correct ? "✅" : "❌")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Slider>
            </div>
          </div>
        </div> 
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-2 text-sm hidden md:block">
        &copy; 2024 Scholarship Exam. All rights reserved.
      </footer>
      {/* Dropdown Menu */}
      {showDropdown && (isLoggedIn || isAdminLoggedIn) && (
              <ul  ref={dropdownRef} className="absolute mb-12 bottom-0 md:bottom-auto mt-0 right-0 md:mt-14 md:mb-0 w-30 md:w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <li title={"Update Profile"}
                  className="px-4 py-2 md:px-4 md:py-2 text-xs md:text-base hover:bg-gray-100 cursor-pointer text-gray-700"
                  onClick={handleProfileUpdate}
                >
                  Update Profile
                </li>
                <li title={"Logout"}
                  className="px-4 py-2 md:px-4 md:py-2 text-xs md:text-base  hover:bg-gray-100 cursor-pointer text-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}

            {/* Profile Update Modal */}
      {isModalOpen && (
        <div title={"Update Profile Photo"} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-96">
            <h2 className="text-lg font-bold mb-4">Update Profile</h2>
            <div title={"Profile Photo"} className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                  accept="image/*"
                  onChange={updateProfileData}
                className="block w-full text-sm text-gray-500 border rounded-lg cursor-pointer"
              />
                 {selectedImage && (
                <p className="mt-2 text-sm text-green-600">
                  Selected file: {selectedImage.name}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button title={"Cancel"}
                className="bg-gray-400 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg"
                onClick={cancelProfileDataButton}
              >
                Cancel
              </button>
              <button title={"Update"}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={updateProfileDataButton}
     
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-blue-500 text-white flex md:hidden justify-between items-center px-2 py-2">
      {isAdminLoggedIn && (
        <span title={"Admin"} className="flex flex-row text-xs md:text-lg lg:text-xl items-center gap-1 hover:text-yellow-400 cursor-pointer" onClick={() => handleNavigation("/admin")}>
          <FaUserShield size={16} />
            Admin
        </span>
      )}
        <span title={"Dashboard"} className="flex flex-row text-xs md:text-lg lg:text-xl items-center gap-1 hover:text-yellow-400 cursor-pointer" onClick={() => handleNavigation("/dashboard")}>
          <FaClipboard size={16} />
          Dashboard
        </span>
        <span title={"About"} className="flex flex-row text-xs md:text-lg lg:text-xl items-center gap-1 hover:text-yellow-400 cursor-pointer" onClick={() => handleNavigation("/about")}>
          <FaInfoCircle size={16} />
          About
        </span>
        <span title={"Contact"} className="flex flex-row text-xs md:text-lg lg:text-xl items-center gap-1 hover:text-yellow-400 cursor-pointer" onClick={() => handleNavigation("/contact")}>
          <FaEnvelope size={16} />
          Contact
        </span>
        {/* <button className="flex flex-row text-xs md:text-lg lg:text-xl items-center gap-1 hover:text-yellow-400 cursor-pointer" onClick={() => handleNavigation("/login")}>
          <FaSignInAlt size={16} />
          Login
        </button> */}
        <span title={"Login"} className="relative">
         {(isLoggedIn || isAdminLoggedIn) ? (
                <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-1 text-xs bg-orange-600 text-white-500 hover:bg-orange-500 px-2 py-2 rounded-lg font-semibold">
                  {/* <FaUser size={16}/> <FaChevronUp size={12}/> */}
                  <img src={userIcon} alt="Profile" title={'Profile'} className="w-8 h-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            /><FaChevronUp size={12}/>
                </div>
              ) : (
                <button
                  className="flex flex-row text-xs md:text-lg lg:text-xl bg-yellow-400 text-blue-500 items-center gap-1 hover:text-yellow-300 cursor-pointer"
                  onClick={() => handleNavigation("/login")}
                >
                  <FaSignInAlt size={16}/> Login
                </button>
              )}
              </span>
      </nav>
      {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
    </div>
  );
};

export default HomeScreen;
