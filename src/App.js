import React, {useState} from "react";
//import QrScanner from "./components/qrScanner/QrScanner";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from "./components/Context/AuthContext";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import ForgotPin from './components/Login/ForgotPin';
import Category from "./components/Home/Category";
import Admin from "./components/Admin/Admin";
import AboutUs from "./components/About/About";
import ContactUs from "./components/Contact/Contact";
import Dashboard from './components/Dashboard/Dashboard';
import TakeTest from './components/Dashboard/TakeTest';
import ViewProfile from './components/Dashboard/ViewProfile';
import UpcomingExam from './components/Dashboard/UpcomingExam';
import PreviousResult from './components/Dashboard/PreviousResult';
import PaymentUI from "./components/Dashboard/PaymentUI";
import TestUI from "./components/Dashboard/TestUI";
import SampleUI from "./components/Dashboard/SampleUI";
import Loader from "./components/Loader";
import './style.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

return (
    // <QrScanner />
    <AuthProvider>
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loading" element={<Loader />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpin" element={<ForgotPin />} />
              <Route path="/category/:categoryName" element={<Category />} />  
              <Route path="/about" element={<AboutUs />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/taketest" element={<TakeTest />} />
              <Route path="/dashboard/viewprofile" element={<ViewProfile />} />
              <Route path="/dashboard/upcomingexams" element={<UpcomingExam />} />
              <Route path="/dashboard/previousresults" element={<PreviousResult />} />
              <Route path="/payment" element={<PaymentUI />} />
              <Route path="/test" element={<TestUI />} />
              <Route path="/sample" element={<SampleUI />} />
          </Routes> 
      </Router>
    </AuthProvider>
);
};

export default App;
