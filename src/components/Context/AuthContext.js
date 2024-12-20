import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [examDetails, setExamDetails] = useState(() => {
    try {
      const storedExamDetails = localStorage.getItem("examDetails");
      if (!storedExamDetails) {
        return []; 
      }
      const parsedDetails = JSON.parse(storedExamDetails);
  
      if (Array.isArray(parsedDetails)) {
        return parsedDetails;  
      } else { 
        return []; 
      }
    } catch (error) { 
      return [];  
    }
  });

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const loginAdmin = () => setIsAdminLoggedIn(true);
  const logoutAdmin = () => setIsAdminLoggedIn(false);

  const addExamDetail = (exam) => {
    if (Array.isArray(examDetails)) {
      const updatedDetails = [...examDetails, exam];
      setExamDetails(updatedDetails);
      localStorage.setItem("examDetails", JSON.stringify(updatedDetails));
    } 
  };

  const clearExamDetails = () => {
    setExamDetails([]);
    localStorage.removeItem("examDetails");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,isAdminLoggedIn,loginAdmin,logoutAdmin,quizData,
      setQuizData, examDetails,
      setExamDetails,
      addExamDetail,
      clearExamDetails, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
