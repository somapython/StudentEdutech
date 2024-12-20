import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Toaster from "../Toaster";

const ForgotPin = ({onForgotPin}) => {
  const [mobileNo, setMobileNo] = useState("");
  const [pin, setPin] = useState(Array(4).fill(""));
  const [error, setError] = useState({});
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

    // Move focus to the next input automatically if the current input is filled
    if (value && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }

  };

  const validate = () => {
    const errors = {};
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNo) {
      errors.mobileNo = "* Mobile number is required";
    } else if (!mobileRegex.test(mobileNo)) {
      errors.mobileNo = "* Invalid mobile number format";
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

  const handleForgotPin = (e) => {
    e.preventDefault();
    // setIsLoginClicked(true);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setToaster({
        type: "danger",
        message:
          !mobileNo && !pin.join("")
            ? "Please do form validation"
            : !mobileNo
            ? "Please enter mobile number"
            : "Please enter 4-digit PIN",
      });
      // setPinError(true);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(
      (u) => u.mobileNo === mobileNo
    );
    if (userIndex !== -1) {
        users[userIndex].pin = pin.join("");
        localStorage.setItem("users", JSON.stringify(users));
        setToaster({ type: "success", message: "PIN reset successful." });
        setLoading(true);
          navigate("/loading");
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 500);
      } else {
        setToaster({ type: "danger", message: "User does not exist." });
        setError("User does not exist.");
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

  const cancelPin =() =>{
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-purple-500 to-pink-500">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBack}
          className="text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
        >
          &larr; Back
        </button>
      </div>
      <div className="w-full max-w-xs md:max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700 mb-6">Forgot PIN</h2>
            <form onSubmit={handleForgotPin} className="space-y-4 m p-4">
            {/* Mobile Number */}
            <div className="relative ">
                <div className="relative">
                    <span className={`absolute top-0 left-3 flex items-center text-blue-500 ${
                        (pinError || isLoginClicked) ? "bottom-5" : "bottom-0"
                        }`}>
                        <FaPhoneAlt />
                    </span>
                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNo}
                    onChange={(e) => {
                    setMobileNo(e.target.value);
                    setError((prev) => ({ ...prev, mobileNo: "" }));
                    setIsLoginClicked(false);
                    setPinError(false);
                    }}
                    className={`w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error.mobileNo ? "border-red-500" : "focus:ring-blue-400"
                    }`}
                />
                </div>
                {error.mobileNo && <p className="text-sm text-red-500 mt-1">{error.mobileNo}</p>}
            </div>
            {/* Pin Code */}
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

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                {loading ? "Processing..." : "Reset PIN"}
            </button>
            <button
               onClick={cancelPin}
                disabled={loading}
                className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
                {loading ? "Processing..." : "Cancel"}
            </button>
            </form>
        </div>
        {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
    </div>
  );
};

export default ForgotPin;
