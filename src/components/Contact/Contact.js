import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import Toaster from "../Toaster";
import thankYouAudio from "../../assets/Contact/Audio/thankYou.wav";
import { saveAs } from 'file-saver';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();
  const audioThankYou = new Audio(thankYouAudio);

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setToaster({ type: "danger", message: "Please fill out the required fields." });
      return;
    }
    
    audioThankYou.play();
    const headers = ["Name", "Email", "Message"];
    const csvContent = [ headers.join(","), `${formData.name},${formData.email},${formData.message}`].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'messages.csv');
    setFormData({ name: '', email: '', message: '' });
    setToaster({ type: "success", message: "Your message has been send successfully!" });
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/contact");
    }, 500);
    return;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-green-500 to-purple-500 text-white">
      <div className="absolute top-2 md:top-4 left-4">
        <button
          onClick={handleBack}
          title="back"
          className="text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
        >
          &larr; Back
        </button>

      </div>
      <div className="container mx-auto px-6 py-4 md:py-4">
        <h1 className="text-xl md:text-4xl font-bold text-center mb-3 md:mb-6">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div>
            <h2 className="text-base md:text-2xl font-semibold mb-1 md:mb-4">Get in Touch</h2>
            <p className="text-xs md:text-lg mb-2 md:mb-6">
              Have questions or feedback? Reach out to us anytime, and we’ll be happy to help you.
            </p>
            <ul className="space-y-1 md:space-y-4">
              <li className="flex items-center" title = {"Location"}>
                <FaMapMarkerAlt className="text-lg md:text-2xl text-red-600 mr-4 md:mr-6" />
                <span className='text-sm md:text-lg'>Wakad, Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center" title = {"Mobile"}>
                <FaPhoneAlt className="text-lg md:text-2xl text-green-700 mr-4 md:mr-6" />
                <span className='text-sm md:text-lg'>8459305176</span>
              </li>
              <li className="flex items-center" title = {"Email"}>
                <FaEnvelope className="text-lg md:text-2xl text-yellow-600 mr-4 md:mr-6" />
                <span className='text-sm md:text-lg'>somnathbagale12@gmail.com</span>
              </li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="bg-white text-gray-800 p-2 md:p-6 rounded-lg shadow-lg">
            <h2 className="text-base md:text-2xl font-semibold mb-1 md:mb-2">Send a Message</h2>
            <div className="mb-1 md:mb-2">
              <label htmlFor="name" className="block text-sm font-semibold mb-1 md:mb-2">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-1 md:py-2 border my-[5px] md:my-[10px] rounded-lg focus:ring focus:ring-green-300"
                // required
              />
            </div>
            <div className="mb-1 md:mb-2">
              <label htmlFor="email" className="block text-sm font-semibold mb-1 md:mb-2">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-1 md:py-2 my-[5px] md:my-[10px] border rounded-lg focus:ring focus:ring-green-300"
                // required
              />
            </div>
            <div className="mb-1 md:mb-2">
              <label htmlFor="message" className="block text-sm font-semibold mb-1 md:mb-2">Message</label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-1 md:py-2 border  my-[5px] md:my-[10px] rounded-lg focus:ring focus:ring-green-300"
              ></textarea>
            </div>
            <button
              type="submit" title = {"submit"}
              className="bg-green-500 float-right text-white px-4 md:px-6 py-2 text-sm md:text-lg rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              {/* Send */}

              {loading ? <FaSpinner className="inline animate-spin" /> : "Send"}
            </button>
            {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;