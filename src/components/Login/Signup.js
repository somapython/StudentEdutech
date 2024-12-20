import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt, FaSchool, FaSpinner} from "react-icons/fa";
import Toaster from "../Toaster";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [schoolName, setSchoolName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toaster, setToaster] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const pinValue = pin.join("");

    if (!name) {
      errors.name = "* Name is required";
    } 
    if (!mobileNo) {
      errors.mobileNo = "* Mobile number is required";
    } else if (!/^\d{10}$/.test(mobileNo)) {
      errors.mobileNo = "* Invalid mobile number";
    }
    if (!pinValue || pinValue.length !== 4) {
      errors.pin = "* Pin code must be 4 digits";
    } else if (!/^\d{4}$/.test(pinValue)) {
      errors.pin = "* Pin code must contain only numbers";
    }
    if (!schoolName) {
      errors.schoolName = "* School name is required";
    }
    if (!selectedClass) {
        errors.selectedClass = "* Class is required";
      }
    if (!city) {
      errors.city = "* City is required";
    }
    return errors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    setIsSubmitClicked(true);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setToaster({
        type: "danger",
        message:
          !mobileNo
            ? "Please enter a valid mobile number"
            : pin.length !== 4
            ? "Pin code must be 4 digits"
            : "Please fill in all fields correctly",
      });
      setPinError(true);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
     const existingUser = users.find((u) => u.mobileNo === mobileNo);
      console.log(users)
    if (existingUser) {
      setToaster({ type: "danger", message: "Mobile number already exists" });
      setIsSubmitClicked(false);
      setPinError(false);
      return;
    }

    users.push({name, mobileNo, pin: pin.join(""), schoolName, selectedClass, city });
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess(true);
    setToaster({ type: "success", message: "Signup successful!" });

    setTimeout(() => navigate("/login"), 1500);
  };

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  };

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    const newPin = [...pin];
    newPin[index] = value.slice(0, 1); // Only allow 1 character per input
    setPin(newPin);

    // Move focus to the next input automatically if the current input is filled
    if (value && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  const handleLogin = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 500);
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-purple-500 to-pink-500">
       {/* Back Button */}
       <div className="absolute top-2 left-2 md:top-4 md:left-4">
        <button
          onClick={handleBack}
          className="text-white hover:underline text-xs md:text-sm font-semibold rounded-lg transition"
        >
          &larr; Back
        </button>
      </div>
      <div className="w-full max-w-xs md:max-w-md bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-10 md:mt-0">
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-700 mb-6">
          Student Signup
        </h1>
        <form onSubmit={handleSignup} className="space-y-1">
           {/* Name */}
           <div className="relative flex flex-col">
                <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-3 flex items-center text-blue-500">
                    <FaUser />
                </span>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                    setName(e.target.value);
                    setError((prev) => ({ ...prev, name: "" }));
                    setIsSubmitClicked(false);
                    setPinError(false);
                    }}
                    className={`w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error.name ? "border-red-500" : "focus:ring-blue-400"
                    }`}
                />
                </div>
                {error.name && <p className="text-sm text-red-500 mt-0 m-0">{error.name}</p>}
            </div>
            {/* Mobile Number */}
            <div className="relative flex flex-col">
                <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-3 flex items-center text-blue-500">
                    <FaPhoneAlt />
                </span>
                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNo}
                    onChange={(e) => {
                    setMobileNo(e.target.value);
                    setError((prev) => ({ ...prev, mobileNo: "" }));
                    setIsSubmitClicked(false);
                    setPinError(false);
                    }}
                    className={`w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error.mobileNo ? "border-red-500" : "focus:ring-blue-400"
                    }`}
                />
                </div>
                {error.mobileNo && <p className="text-sm text-red-500 mt-0 m-0">{error.mobileNo}</p>}
            </div>

            {/* Pin Code */}
            <div className="flex flex-wrap justify-between items-baseline sm:space-x-0 space-y-0 sm:space-y-0">
            {pin.map((digit, index) => (
               <div key={index} className="relative w-1/6 sm:w-1/5">
                  <input
                     id={`pin-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => {handlePinChange(e, index);
                                    setIsSubmitClicked(false);
                                    setPinError(false);
                    }}
                    className={`w-full py-2 border rounded-md text-center focus:outline-none focus:ring-2 ${
                      error.pin ? "border-red-500" : "focus:ring-blue-400"
                    }`}
                  />
               </div>
            ))}
          </div>
          {error.pin && <p className="text-sm text-red-500 mt-0 m-0">{error.pin}</p>}

            {/* School Name */}
            <div className="relative flex flex-col">
                <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-3 flex items-center text-blue-500">
                    <FaSchool />
                </span>
                <input
                    type="text"
                    placeholder="School Name"
                    value={schoolName}
                    onChange={(e) => {
                    setSchoolName(e.target.value);
                    setError((prev) => ({ ...prev, schoolName: "" }));
                    setIsSubmitClicked(false);
                    setPinError(false);
                    }}
                    className={`w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error.schoolName ? "border-red-500" : "focus:ring-blue-400"
                    }`}
                />
                </div>
                {error.schoolName && <p className="text-sm text-red-500 mt-0 m-0">{error.schoolName}</p>}
            </div>

            {/* Class */}
            <div className="relative flex flex-col">
                <select
                value={selectedClass}
                onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setError((prev) => ({ ...prev, selectedClass: "" }));
                    setIsSubmitClicked(false);
                    setPinError(false);
                }}
                className={`w-full py-3 text-gray-400 px-3 border rounded-md focus:outline-none focus:ring-2 ${
                    error.selectedClass ? "border-red-500" : "focus:ring-blue-400"
                }`}
                >
                <option value="" disabled >
                    Select your class
                </option>
                <option value="Nursery">Nursery</option>
                <option value="KG">KG</option>
                {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={`Class ${num + 1}`}>
                    Class {num + 1}
                    </option>
                ))}
                </select>
                {error.selectedClass && <p className="text-sm text-red-500 mt-0 m-0">{error.selectedClass}</p>}
            </div>

            {/* City */}
            <div className="relative flex flex-col">
                <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-3 flex items-center text-blue-500">
                    <FaMapMarkerAlt />
                </span>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => {
                    setCity(e.target.value);
                    setError((prev) => ({ ...prev, city: "" }));
                    setIsSubmitClicked(false);
                    setPinError(false);
                    }}
                    className={`w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error.city ? "border-red-500" : "focus:ring-blue-400"
                    }`}
                />
                </div>
                {error.city && <p className="text-sm text-red-500 mt-0 m-0">{error.city}</p>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-lg md:text-xl"
            >
                {loading ? "Signing Up..." : "Sign Up"}
            </button>
            </form>

        {success && <p className="text-center text-green-500 mt-4 m-0">Signup successful! Redirecting...</p>}

        <div className="mt-4 text-center text-base md:text-lg">
          Already have an account?{" "}
          <span
            onClick={handleLogin}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {loading ? <FaSpinner className="inline animate-spin" /> : "Login"}
          </span>
        </div>
      </div>

      {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
    </div>
  );
};

export default Signup;
