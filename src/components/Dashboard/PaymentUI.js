import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaMobileAlt, FaUniversity, FaMoneyBillWave, FaExclamationCircle, FaCheckCircle, FaArrowCircleRight,FaArrowCircleLeft, FaAmazonPay, FaPaypal , FaInfoCircle , FaSpinner, FaApplePay, } from "react-icons/fa";
import "./PaymentUI.css";
import Toaster from "../Toaster";
import loadingAudio from "../../assets/Dashboard/Audio/Waiting.mp3";
import demoAudio from "../../assets/Dashboard/Audio/demo.mp3";
import sucessAudio from "../../assets/Dashboard/Audio/sucess.wav";
import failAudio from "../../assets/Dashboard/Audio/Tryagain.mp3";
import qrScannerForUPI from '../../assets/Dashboard/qrScannerForUPI.jpeg';
import phonePayIcon from '../../assets/Dashboard/phonePe.png';
import googlePayIcon from '../../assets/Dashboard/gPay.png';
import paytmPayIcon from '../../assets/Dashboard/paytm.png';
import cardIcon from '../../assets/Dashboard/card.png';
import cvvIcon from '../../assets/Dashboard/cvv.png';
import cashIcon from '../../assets/Dashboard/rupee.png';
import cashIcon1 from '../../assets/Dashboard/cash-2.png';
import cashIcon2 from '../../assets/Dashboard/cash-1.png';
import cashIcon3 from '../../assets/Dashboard/cash-3.png';
import cashIcon4 from '../../assets/Dashboard/cash.png';
import cashIcon5 from '../../assets/Dashboard/cash-4.png';


const Payment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationClass, setAnimationClass] = useState("animate-fadeIn");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [makePayment, setMakePayment] = useState(false);
  const [showMakePaymentModal, setShowMakePaymentModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [formData, setFormData] = useState({ bankName: "", accountNumber: "", ifscCode: "", upiId: "", cardNumber: "", cardName: "", expiryDate: "",cvv: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showRazorpayDemoModal, setShowRazorpayDemoModal] = useState(false);
  const [isSetVariable, setIsSetVariable] = useState(false);
  const [isSetDemoVariable, setIsSetDemoVariable] = useState(false);
  const [transitionSuccesModal,setTransitionSuccesModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const paymentOptions = [
    { id: "upi", label: "UPI", icon: <FaMobileAlt size={30} />,color:"text-purple-500" },
    { id: "card", label: "Card", icon: <FaCreditCard size={30} />,color:"text-red-500"},
    { id: "netbanking", label: "Net Banking", icon: <FaUniversity size={30} />,color:"text-yellow-500" },
    { id: "cash", label: "Cash", icon: <FaMoneyBillWave size={30} />,color:"text-pink-500" },
  ];

  const banks = ["Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "SBI", "OTHERS"];
  const handlePaymentSelect = (option) => {
    setSelectedOption(option);
    setFormData({
      selectedBank: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    });
    setErrors({});
    setAnimationClass("animate-fadeOut");
    setTimeout(() => {
      setSelectedOption(option);
      setAnimationClass("animate-fadeIn");
    }, 300); 
  };

  useEffect(() => {
    if (window.Razorpay) {
      // console.log('Razorpay is available');
    } else {
     // console.error('Razorpay is not loaded');
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let validationErrors = {};
    if (selectedOption.id === "netbanking") {
      if (!formData.selectedBank) validationErrors.selectedBank = "Bank name is required.";
      if (!formData.accountNumber) validationErrors.accountNumber = "Account number is required.";
      if (!formData.ifscCode) validationErrors.ifscCode = "IFSC code is required.";
    }
    if (selectedOption.id === "card") {
      if (!formData.cardNumber) validationErrors.cardNumber = "Card number is required.";
      if (!formData.cardName) validationErrors.cardName = "Cardholder name is required.";
      if (!formData.expiryDate) validationErrors.expiryDate = "Expiry date is required.";
      if (!formData.cvv) validationErrors.cvv = "CVV is required.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const createOrder = async () => {
    try{
    const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1, currency: "INR", receipt: "receipt123" }),
    });
    const order = await response.json();
    return order;
  }catch(error){
    const order =  {
      "amount": 100,
      "amount_due": 100,
      "amount_paid": 0,
      "attempts": 0,
      "created_at": 1733913631,
      "currency": "INR",
      "entity": "order",
      "id": "order_PVq73TOuKkfgVq",
      "notes": [],
      "offer_id": null,
      "receipt": "receipt123",
      "status": "created"
  }
  // console.log("4444",order)
    return order;
  }
};

  const handleProceedPayment = async() => {
    const audio = new Audio(loadingAudio);
    if (!selectedOption) {
      setToaster({ type: "danger", message: "Please select a payment method" });
      return;
    }
    if (validateForm()) {
      setIsSetVariable(false);
      setIsSetDemoVariable(false);
      if (selectedOption.id === "upi" || selectedOption.id === "card" || selectedOption.id === "netbanking") {
      audio.play();
      setShowLoadingModal(true);
        if (window.Razorpay) {
        const order = await createOrder();
  
        const options = {
          key: "rzp_test_26tnIkcgq12vuo",
          amount: order.amount,
          currency: "INR",
          name: "EDUTECH",
          description: "Test Transaction",
          order_id: order.id,
          handler: async function (response) {
            const verifyResponse = await fetch("http://localhost:5000/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
            });

            if (verifyResponse.ok) {
                alert("Payment successful!");
                setToaster({ type: "success", message: "Payment successful!" });
            } else {
                alert("Payment verification failed.");
                setToaster({ type: "danger", message: "Payment verification failed." });
            }
        },
          prefill: {
            name: "Somnath",
            email: "somnathbagale12@gmail.com",
            contact: "8459305176",
          },
          theme: {
            color: "#F37254",
          },
        };
        const razorpay = new window.Razorpay(options);
          setSelectedOption(null);
          setTimeout(() => {
            setShowLoadingModal(false);
            razorpay.open();
            setIsSetVariable(true);
          }, 7000); 
        }
        else{
        setToaster({ type: "danger", message: "Razorpay is not loaded" });
        return;
      }
      }
      else{
        setTransitionSuccesModal(true);
      }
    }else{
      setToaster({ type: "danger", message: "Please fill out all required fields correctly" });
      return;
    }
  };


  const validValues = ["somnath123", "edutech123", "pooja123"];
  const handleSubmitModal =(e)=>{
    e.preventDefault();
    const audioLoad = new Audio(loadingAudio);
    audioLoad.play();
    setTransitionSuccesModal(false);
    setShowLoadingModal(true);
    setTimeout(()=>{
      setShowLoadingModal(false); 
      const audio = new Audio(sucessAudio); 
      const audioFail = new Audio(failAudio); 
      if (validValues.includes(inputValue.trim()) && inputValue.trim() !=="") {
        audio.play();
        setPaymentSuccess(true);
        setToaster({ type: "success", message: "Transition id correctly" });
        return
      } else {
        audioFail.play();
        setTransitionSuccesModal(false);
        setToaster({ type: "danger", message: "Please fill the transition id correctly" });
        return
      }                                                                                                                                                     
    },7000)
    setInputValue(""); 
    setSelectedOption(null);
  };

 const closeSubmitModal = () =>{
  setTransitionSuccesModal(false);
  setInputValue(""); 
  setSelectedOption(null);
 }

  useEffect(() => {
    if (isSetVariable) {
      const audio = new Audio(demoAudio);
        setTimeout(() => {
          audio.play();
          const razorpayContainer = document.querySelector('.razorpay-container');
          if (razorpayContainer) {
            razorpayContainer.style.display = 'none'; 
            setShowRazorpayDemoModal(true); 
            setIsSetDemoVariable(true);
          }
        }, 8000);
    }
  }, [isSetVariable]); 

  useEffect(() => {
     const audio = new Audio(sucessAudio);
    if (isSetDemoVariable) {
        setTimeout(() => {
          audio.play();
            setShowRazorpayDemoModal(false);
            setPaymentSuccess(true);
        }, 7000);
    }
  }, [isSetDemoVariable]); 

  
  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 500);
  };

  const handleSample = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/sample"); 
    }, 500);
  };

  const handleTest = () => {
    if(makePayment){
      setLoading(true);
      navigate("/loading");
      setTimeout(() => {
        setLoading(false);
         navigate("/dashboard/taketest");
      }, 500);
    }else{
      setShowMakePaymentModal(true);
    }
   
  };

  const closeModal = () => {
    setPaymentSuccess(false);
    setMakePayment(true);
  };

  const closeMakeModalModal=()=>{
    setShowMakePaymentModal(false);
  }

  const proceedToPayment=()=>{
    setLoading(true);
      navigate("/loading");
      setTimeout(() => {
        setLoading(false);
         navigate("/payment");
      }, 500);
  }

  const renderPaymentUI = () => {
    if (!selectedOption) return null;

    switch (selectedOption.id) {
      case "upi":
        return <div className="bg-gray-400 p-4 mx-4 mt-2 md:mt-1 md:mx-24 rounded shadow flex items-center justify-center flex-col animate-fadeIn">
                   <div className="absolute top-1/5 md:top-1/2 left-10 md:leftt-20 transform -translate-y-1/2 -translate-x-1/2 text-blue-600 animate-bounce">
                    <div className="bg-purple-700 text-white p-2 md:p-3 rounded-full shadow-md flex items-center justify-center w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                        <img src={phonePayIcon} alt="phonePay Icon" className="h-[25px] w-[25px] md:w-[40px] md:h-[40px] text-base md:text-2xl" />
                    </div>
                </div>
                <div className="hidden md:flex absolute md:top-1/2 md:right-96 transform -translate-y-1/2 -translate-x-1/2 text-blue-600 animate-bounce">
                    <div className="bg-yellow-400 text-white p-2 md:p-3 rounded-full shadow-md flex items-center justify-center w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                        <FaPaypal  className="h-[25px] w-[25px] md:w-[40px] md:h-[40px] text-base md:text-2xl" /> 
                       
                    </div>
                </div>
                <div className="hidden md:flex absolute md:top-1/2 md:left-96 transform -translate-y-1/2 -translate-x-1/2 text-blue-600 animate-bounce">
                    <div className="bg-gray-100 text-white p-2 md:p-3 rounded-full shadow-md flex items-center justify-center w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                        
                        <img src={paytmPayIcon} alt="paytmPay Icon" className="h-[25px] w-[25px] md:w-[40px] md:h-[40px] text-base md:text-2xl" />
                    </div>
                </div>
                <div className="absolute top-1/5 md:top-1/2 right-10 md:right-20 transform -translate-y-1/2 -translate-x-1/2 text-blue-600 animate-bounce">
                    <div className="bg-gray-100 text-white p-2 md:p-3 rounded-full shadow-md flex items-center justify-center w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                        <img src={googlePayIcon} alt="googlePay Icon" className="h-[25px] w-[25px] md:w-[40px] md:h-[40px] text-base md:text-2xl" />
                    </div>
                </div>
                <div className="hidden md:flex absolute md:top-3/4 md:left-56 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
                  <div className="bg-red-500 text-white p-2 md:p-3 rounded-full shadow-md flex items-center justify-centerw-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                      <FaApplePay className="h-[25px] w-[25px] md:w-[40px] md:h-[40px]text-base md:text-2xl" /> 
                  </div>
                </div>
                <div className="hidden md:flex absolute md:top-3/4 md:right-56 transform -translate-y-1/2 -translate-x-1/2 text-red-600 animate-bounce">
                    <div className="bg-orange-500 text-white p-2 md:p-3 rounded-full shadow-md flex items-center justify-center w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
                        <FaAmazonPay className="h-[25px] w-[25px] md:w-[40px] md:h-[40px] text-base md:text-2xl" /> 
                    </div>
                </div>
                  <img src={qrScannerForUPI} alt="UPI QR Scanner" title={"UPI QR Scanner"} className="rounded-lg mt-2 w-[200px] h-[200px] md:w-[190px] md:h-[190px]" />
                  {/* <span className="mt-2 md:mt-2 text-space md:text-xl">Scan the QR code for UPI payment.</span> */}
                  <span className="mt-2 md:mt-2 text-sm md:text-lg">Do not Scan the QR code for UPI payment. This is only Sample Prototype. </span>
                </div>;
      case "card":
        return (
          <div className="bg-gray-300 p-4 mx-4 mt-4 md:mt-0 md:mx-80 rounded shadow animate-fadeIn">
            <label className="block mb-0 text-base md:text-lg">Card Number:</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              className={`p-2 border rounded  text-sm md:text-base md:my-[5px] w-full ${errors.cardNumber ? "border-red-500" : ""}`}
              placeholder="Enter Card Number"
            />
            {/* {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>} */}
            <img src={cardIcon} alt="Card Icon"
          className="absolute right-16 top-2/5 md:right-96 md:top:1/2 transform -translate-y-1/2 h-12 w-12" />
            <label className="block mt-0 mb-0 text-base md:text-lg">Cardholder Name:</label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value)}
              className={`p-2 border rounded text-sm md:text-base md:my-[5px] w-full ${errors.cardName ? "border-red-500" : ""}`}
              placeholder="Enter Cardholder Name"
            />
            {/* {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>} */}

            <div className="flex gap-4 mt-0 mx-4 sm:mx-6 md:mx-12">
              <div>
                <label className="block mb-0 text-sm md:text-base">Expiry Date:</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className={`p-2 border text-sm md:text-lg md:my-[5px] rounded ${errors.expiryDate ? "border-red-500" : ""}`}
                  placeholder="MM/YY"
                />
                {/* {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>} */}
              </div>
              <div>
                <label className="block mb-0 text-sm md:text-base">CVV:</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className={`p-2 border text-sm md:text-lg md:my-[5px] rounded ${errors.cvv ? "border-red-500" : ""}`}
                  placeholder="CVV"
                />
                {/* {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>} */}
                <img src={cvvIcon} alt="CVV Icon"
              className="absolute right-16 md:right-96 top-5/6 transform -translate-y-1/2 h-12 w-12" />
              </div>
            </div>
          </div>
        );
      case "netbanking":
        return (
          <div className="bg-gray-300 p-4 mx-4 md:mx-64 rounded shadow animate-fadeIn">
            <label className="block mb-2 text-base md:text-2xl font-bold text-center">Bank Details</label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className={`p-2 my-[10px] border rounded w-full text-gray-400 ${errors.selectedBank ? "border-red-500" : ""}`}
            >
              <option value="" disabled>
                Select Bank
              </option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {/* {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>} */}
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange("accountNumber", e.target.value)}
              className={`p-2 border rounded w-full ${errors.accountNumber ? "border-red-500" : ""}`}
              placeholder="Enter Account Number"
            />
            {/* {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>} */}

            <input
              type="text"
              value={formData.ifscCode}
              onChange={(e) => handleInputChange("ifscCode", e.target.value)}
              className={`p-2 border rounded w-full ${errors.ifscCode ? "border-red-500" : ""}`}
              placeholder="Enter IFSC Code"
            />
            {/* {errors.ifscCode && <p className="text-red-500 text-sm">{errors.ifscCode}</p>} */}
          </div>
        );
      case "cash":
        return (
          <div  title={"Cash Payment"}
          className="bg-gray-100 p-6 mx-4 md:mx-64 rounded shadow-lg mt-4 animate-fadeIn flex flex-col items-center gap-4"
        >
          <div className="text-green-600 flex items-center gap-2">
          <img src={cashIcon}  alt="Spinning Icon"className="w-12 h-12 md:w-16 md:h-16 animate-spin" />
            <h3 className="text-xl md:text-2xl font-bold">Cash Payment</h3>
          </div>
          <p className="text-gray-600 text-center">
            Please pay the cash amount at the counter to complete your transaction.
          </p>
          <div className="flex gap-4 mt-4 md:mt-2 items-center justify-center">
            <img src={cashIcon4} alt="Icon 3" className="w-10 h-10" />
            <img src={cashIcon1} alt="Icon 1" className="w-10 h-10" />
            <img src={cashIcon2} alt="Icon 2" className="w-10 h-10" />
            <img src={cashIcon3} alt="Icon 3" className="w-10 h-10" />
            <img src={cashIcon5} alt="Icon 3" className="w-10 h-10" />           
          </div>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-blue-200 p-4 flex flex-col items-center">
      <header title={"Choose Payment Method"} className="bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 shadow p-4 rounded w-full text-center mb-4">
       <div className="absolute top-6 left-4 px-[10px] md:px-auto md:top-6 md:left-10">
        <button
          onClick={handleBack}
          title = {"back"}
          className="text-white hover:underline text-xs md:text-base font-semibold rounded-lg transition"
        >
          &larr; Back
        </button>
      </div> 

        <h1 className="text-base md:text-2xl text-right md:text-center font-bold text-white">Choose Payment Method</h1>
      </header>
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 gap-4">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handlePaymentSelect(option)}
            title={option.label}
            className={`cursor-pointer p-2 md:p-4 rounded shadow text-sm md:text-lg flex items-center justify-between bg-white hover:bg-blue-100 transition ${
              selectedOption?.id === option.id ? "bg-green-300 border-2 border-blue-500" : "bg-white"
            }`}
          >
            <div className="flex flex-row items-center gap-4">
             <span className={option.color}>{option.icon}</span> 
              <span>{option.label}</span>
            </div>
            {selectedOption?.id === option.id && <FaCheckCircle className="text-green-700" />}
          </div>
        ))}
      </div>

      <div className="w-full mt-3 md:mt-6">{renderPaymentUI()}</div>
      <div className="mt-3 md:mt-6 flex flex-row gap-4 mt-4 items-center justify-between w-full px-0 md:px-8">
        {/* <button  title={"Back to Dashboard"} onClick={handleBack} className="px-4 py-2 bg-blue-400 text-gray-800 text-sm md:text-lg rounded hover:bg-blue-300" >
            Back to Dashboard
        </button> */}
        <button  title={"Sample Test"} onClick={handleSample} className="px-4 py-2 bg-gray-400 text-gray-800 text-sm md:text-lg rounded hover:bg-gray-300" >
            Sample Test
        </button>
          {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
        <button  title={"Proceed to Pay"}  onClick={handleProceedPayment} className="bg-green-500 hover:bg-green-400 text-white text-sm md:text-lg px-4 py-2 rounded ">
          Proceed to Pay
        </button>
        {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
        <button  title={"Final Test"} onClick={handleTest} className="px-4 py-2 bg-blue-400 text-gray-800 text-sm md:text-lg rounded hover:bg-blue-300" >
            Final Test
        </button>
        {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
      </div>

        {showLoadingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn backdrop-blur-lg">
          <div title={"Loading..."}  className="bg-white rounded-lg shadow-xl w-[90%] md:max-w-xl h-[50%] md:w-full p-8 transform transition-transform duration-500 ease-in-out scale-105 hover:scale-100 animate-popIn">
            <div className="mb-6 flex justify-center animate-spin-slow">
              <FaSpinner className="text-6xl text-blue-500 animate-spin-slow" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-4">
              Please wait while we process your request....
            </h2>
            <div className="relative pt-4">
              <div className="absolute inset-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-pulse"></div>
            </div>
            <div className="mt-4 text-center text-sm md:text-base text-gray-600 animate-bounce">
              Processing your request. Please do not close this window.
            </div>
          </div>
        </div>
      )}
        {showRazorpayDemoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white rounded-lg shadow-xl w-[90%] md:max-w-xl h-[70%] md:w-full p-8 transform transition-transform duration-500 ease-in-out scale-105 hover:scale-100 animate-popIn">
            <div className="flex justify-center mb-4">
                <FaInfoCircle className="text-6xl text-yellow-500 animate-spin" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4"> Demo Mode - Payment Simulation</h2>
            <p className="text-gray-600 text-base md:text-xl mb-2 md:mb-6">
                This is a demo version of our payment system. In this demo, the payment process is simulated and will not involve actual transactions.
            </p>
            <p className="text-gray-500 mb-2 md:mb-4 text-base md:text-xl">
                <strong>Important:</strong> In production, the payment system will be fully functional, and real transactions will be processed securely.
            </p>
            {/* <p className="text-gray-500">
                Please proceed as if making a real payment, but rest assured, no money will be charged during this demo.
            </p> */}
            </div>
        </div>
        )}

      {transitionSuccesModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-lg">
        <div  title = {"transition Modal.."} className="bg-white p-8 rounded-xl shadow-2xl w-[90%] md:max-w-md transform transition-transform duration-500 ease-in-out scale-105 hover:scale-100 animate-popIn">
          <div className="flex justify-center mb-6">
            <FaArrowCircleRight size={50} className="text-green-500 animate-bounce" />
          </div>
          <h2 className="text-xl md:text-3xl font-semibold text-green-600 mb-4">
                Transition in Progress
          </h2>
          <p className="text-base md:text-lg  text-gray-700 mb-4 md:mb-6">
                Please enter your details to proceed with the transition.
          </p>
          <form onSubmit={handleSubmitModal}>
                <input type="text" placeholder="Enter your details"  value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required/>
                 <p className="text-xs md:text-sm text-red-500 mb-2md:mb-6">
                    <strong>Note:</strong> For demo success id is somnath123.
                </p>
                <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200 transform hover:scale-105" >
                Submit
                </button>
          </form>
          <div title={"close modal"} className="flex justify-center mt-6">
            <FaArrowCircleLeft onClick={closeSubmitModal} size={30} className="cursor-pointer text-gray-600 hover:text-gray-400 transition duration-200 transform hover:scale-105 animate-bounce"  />
          </div>
        </div>
      </div>
    )}
  
            {/* Payment Success Modal */}
            {paymentSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-lg">
                <div title = {"Payment Success.."} className="bg-white p-8 rounded-xl shadow-2xl w-[90%] md:max-w-md transform transition-transform duration-500 ease-in-out scale-105 hover:scale-100 animate-popIn">
                <div className="flex justify-center mb-6">
                    <FaCheckCircle size={70} className="text-green-500 animate-pulse" />
                </div>
                <h2 className="text-xl md:text-3xl font-semibold text-green-600 mb-4">
                    Payment Successful!
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                    Thank you for your payment. Your transaction has been processed successfully.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    You will receive a confirmation email with your payment details shortly.
                </p>
                <button  titile= {"Close modal"}
                    onClick={closeModal}
                    className="mt-4 px-6 py-3 bg-green-500 text-white float-right rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition duration-200 transform hover:scale-105"
                >
                    Close
                </button>
                </div>
            </div>
            )}

{showMakePaymentModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-lg">
    <div
      title={"Payment Required"}
      className="bg-white p-8 rounded-xl shadow-2xl w-[90%] md:max-w-md transform transition-transform duration-500 ease-in-out scale-105 hover:scale-100 animate-popIn"
    >
      <div className="flex justify-center mb-6">
        <FaExclamationCircle size={70} className="text-red-500 animate-spin" />
      </div>
      <h2 className="text-xl md:text-3xl text-center font-semibold text-red-600 mb-4">
        Payment Required
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        To proceed, please complete your payment. Access to other parts of the application is restricted until payment is made.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        If you need assistance, please contact support or refer to the instructions provided.
      </p>
      <div className="flex justify-end space-x-4">
        <button
          title={"Proceed to Payment"}
          onClick={proceedToPayment}
          className="px-5 md:px-6 py-3 bg-blue-500 text-sm md:text-lg text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200 transform hover:scale-105"
        >
          Proceed to Payment
        </button>
        <button
          title={"Close Modal"}
          onClick={closeMakeModalModal}
          className="px- md:px-6 py-3 bg-gray-500 text-sm md:text-lg text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none transition duration-200 transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Payment;
