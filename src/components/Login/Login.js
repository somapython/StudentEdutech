import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaSpinner } from "react-icons/fa";
import { useAuthContext } from '../Context/AuthContext';
import Toaster from "../Toaster";
import loginImage from '../../assets/Login/login.png';

const Login = ({ onLogin }) => {
  const { login,loginAdmin } = useAuthContext ();
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [toaster, setToaster] = useState(null);
  const navigate = useNavigate();

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    const newPin = [...pin];
    newPin[index] = value.slice(0, 1); // Only allow 1 character per input
    setPin(newPin);

    if (value && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  const validate = () => {
    const errors = {};
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) {
      errors.mobile = "* Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      errors.mobile = "* Invalid mobile number format";
    }
    const pinValue = pin.join("");
    if (pinValue.length < 4) {
      errors.pin = "* PIN must be 4 digits";
    } else if (/[^0-9]/.test(pinValue)) {
      errors.pin = "* PIN must contain only numbers";
    } else if (pin.some((digit) => digit === "")) {
      errors.pin = "* PIN must be fully entered";
    }
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoginClicked(true);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      // console.log("1111",!mobile,errors)
      setToaster({
        type: "danger",
        message:
          !mobile && !pin.join("")
            ? "Please do form validation"
            : !mobile
            ? "Please enter mobile number"
            : !pin.join("") ? "Please enter 4-digit PIN": "Invalid mobile number format"
      });
      setPinError(true);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.mobileNo === mobile && u.pin === pin.join("")
    );

    if (user) {
      // console.log("5555",user)
      if(user.mobileNo ==="9665345990" && user.pin === "9665"){
        localStorage.setItem("loggedInMobileNo", JSON.stringify(mobile));
        setToaster({ type: "success", message: "Admin Login Successful" });
        loginAdmin();
        navigate("/");
      }
     else if ((user.pin === pin.join(""))) {

        localStorage.setItem("loggedInMobileNo", JSON.stringify(mobile));
        setToaster({ type: "success", message: "Login Successful" });
        login();
        navigate("/");
      } else {
        setToaster({ type: "danger", message: "Invalid PIN" });
        setError("Invalid PIN");
      }
    } else {
      setToaster({ type: "danger", message: "User does not exist. Please sign up." });
      setError("User does not exist");
      setIsLoginClicked(false);
      setPinError(false);
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

  const handleSignup = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/signup");
    }, 500);
  };

  const handleForgot = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/forgotpin");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-500 via-purple-500 to-pink-500">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBack}
          className="text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
        >
          &larr; Back
        </button>
      </div>

      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <img
          src={loginImage} 
          alt="Student Login"
          className="w-2/3 rounded-lg shadow-lg"
        />
      
      </div>

      {/* Right Side - Login Form */}
      <div className="min-h-screen flex-col flex items-center justify-center">
      <div className="w-full max-w-xs md:max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8 m-8 sm:m-4">
      <h1 className="text-xl md:text-2xl font-bold text-center text-gray-700 mb-6">Student Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <span className={`absolute top-0 left-3 flex items-center text-blue-500 ${
                (pinError || isLoginClicked) ? "bottom-5" : "bottom-0"
                }`}>
              <FaPhoneAlt />
            </span>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setError({ ...error, mobile: "" });
                setIsLoginClicked(false);
                setPinError(false);
              }}
              className={`w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                error.mobile ? "border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {error.mobile && <p className="text-sm text-red-500 mt-1">{error.mobile}</p>}
          </div>

            <div className="flex flex-wrap justify-between items-baseline sm:space-x-2 space-y-2 sm:space-y-0">
                {pin.map((digit, index) => (
                    <div key={index} className="relative w-1/6 sm:w-1/5">
                    <input
                        id={`pin-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handlePinChange(e, index)}
                        className={`w-full py-2 border rounded-md text-center focus:outline-none focus:ring-2 ${
                        error.pin ? "border-red-500" : "focus:ring-blue-400"
                        }`}
                    />
                    </div>
                ))}
            </div>
             {error.pin && <p className="text-sm text-red-500 mt-1">{error.pin}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-lg md:text-xl"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-base md:text-lg">
            {/* Forgot PIN? */}
            <span
            onClick={handleForgot}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {loading ? <FaSpinner className="inline animate-spin" /> : "Forgot PIN? "}
          </span> 
        </div>
        <div className="mt-4 text-center text-base md:text-lg">
          Don’t have an account?{" "}
          <span
            onClick={handleSignup}
            className="text-blue-500 hover:underline cursor-pointer  "
          >
            {loading ? <FaSpinner className="inline animate-spin" /> : "Sign Up"}
          </span>
        </div>
      </div>
                </div>
      {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
    </div>
  );
};

export default Login;
