import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaPhoneAlt, FaSchool, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import ViewProfileIcon from "../../assets/Dashboard/viewProfile-1.png";
import userIcon from "../../assets/Dashboard/user.png";
import Toaster from "../Toaster";

const ViewProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [tempImage,setTempImage] = useState(null);
  const storedProfile = JSON.parse(localStorage.getItem("users")) || [];
  const loginMobileNo = JSON.parse(localStorage.getItem("loggedInMobileNo"));
  const navigate = useNavigate();

  const defaultProfile = {
    name: "Siddharth Suryakamble",
    schoolName: "Sane Guruji Vidyalaya",
    selectedClass: "Class 4",
    city: "Pune, India",
    mobileNo: "9876543210",
  };
  const loggedInProfile = storedProfile.find(
    (user) => user.mobileNo === loginMobileNo
  ) || defaultProfile;

  const [profileData, setProfileData] = useState(loggedInProfile);
  const [editData, setEditData] = useState({ ...loggedInProfile, image: loggedInProfile.image || null });

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileData((prevData) => ({
        ...prevData,
        image: storedImage, 
      }));
    }
  }, []);

  if (!loginMobileNo) {
    navigate("/login");
    return null;
  }

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setEditData({
        ...editData,
        image: tempImage || editData.image,  
      });
      const updatedProfiles = storedProfile.map((user) =>
        user.mobileNo === loginMobileNo ? { ...editData, image: tempImage || editData.image } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedProfiles));
      localStorage.setItem("profileImage", tempImage || editData.image);
    setProfileData({ ...editData,image: tempImage || editData.image});
      setIsModalOpen(false);  
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard/viewProfile");
      setToaster({ type: "success", message: "Profile Edited Successfully!" });
    }, 2500);
  };

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 500);
  };

 
  const standards = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result);  
    };
    reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-pink-200 via-blue-100 to-purple-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded-t-lg shadow-lg">
        <button
          onClick={handleBack}
          className="absolute left-6 text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
        >
          &larr; Back
        </button>
        <h2 className="text-xl md:text-3xl font-bold text-center text-white mt-2">Profile</h2>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row bg-custom-pink rounded-lg shadow-lg w-full max-w-5xl mx-auto mt-4 gap-6 p-4">
        {/* Left Section */}
        <div className="hidden md:flex w-full md:w-1/2 border-r border-gray-300 bg-gradient-to-b from-blue-100 to-blue-200 p-6 flex flex-col items-center rounded-lg">
          <img
            src={ViewProfileIcon}
            title={'ProfileIcon Descriptions'}
            alt="Static Design"
            className="w-96 h-96 rounded-lg shadow-lg mb-2 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Section */}
        
        <div className="w-full md:w-1/2 p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
                <img
                src={tempImage || profileData.image || userIcon}
                alt="Profile"
                title={'Profile'}
                className="w-28 h-28 rounded-full shadow-lg mb-4 hover:scale-110 transition-transform duration-300 hover:ring-4 hover:ring-blue-300"
                />
                <h2 title={profileData.name} className="text-2xl md:text-3xl font-bold text-blue-800 mb-2 text-center capitalize truncate max-w-60 md:max-w-xs hover:scale-105 transition-transform duration-300">
                {profileData.name}
                </h2>
                <ul className="mt-4 text-lg sm:text-xl text-gray-700 space-y-4 w-full">
                <li title={profileData.mobileNo} className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <FaPhoneAlt className="text-green-700 text-xl animate-bounce" />
                    <span className="text-gray-800 capitalize truncate max-w-60 md:max-w-xs">{profileData.mobileNo}</span>
                </li>
                <li title={profileData.schoolName} className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <FaSchool className="text-indigo-700 text-xl animate-bounce" />
                    <span className="text-gray-800 capitalize truncate max-w-60 md:max-w-xs">{profileData.schoolName}</span>
                </li>
                <li title={profileData.selectedClass} className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <FaGraduationCap className="text-yellow-700 text-xl animate-bounce" />
                    <span className="text-gray-800 capitalize">{profileData.selectedClass}</span>
                </li>
                <li title={profileData.city} className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
                    <FaMapMarkerAlt className="text-blue-700 text-xl animate-bounce" />
                    <span className="text-gray-800 capitalize truncate max-w-60 md:max-w-xs">{profileData.city}</span>
                </li>
                </ul>
                <button
                title={'Edit Profile'}
                className="mt-6 px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                onClick={handleEdit}
                >
                Edit Profile
                </button>
            </div>
            </div>
        </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[80%] max-w-[80%] md:w-full md:max-w-md p-4 relative">
            <button
              title={"close"}
              className="absolute top-4 right-4 text-gray-500 bg-transparent hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes size={16} />
            </button>
            <h3 title={"Edit Profile"} className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h3>
            <form>
              {["Name", "City"].map((field, index) => (
                <div className="mb-1" key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={editData[field.toLowerCase().replace(" ", "")]}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        [field.toLowerCase().replace(" ", "")]: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
                  />
                </div>
              ))}
              <div className="mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  School Name
                </label>
                <input
                  type="text"
                  value={editData.schoolName}
                  onChange={(e) =>
                    setEditData({
                      ...editData,schoolName: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>
              <div className="mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={editData.mobileNo}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div className="mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Standard
                </label>
                <select
                  value={editData.selectedClass}
                  onChange={(e) =>
                    setEditData({ ...editData, selectedClass: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                >
                  {standards.map((standard, index) => (
                    <option key={index} value={standard}>
                      {standard}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  title={"Cancel"}
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600 transition-colors"
                  onClick={() => {setIsModalOpen(false);
                    setTempImage(null); 
                  }}  
                >
                  Cancel
                </button>
                <button
                  title={"Save"}
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toaster */}
      {toaster && <Toaster type={toaster.type} message={toaster.message} />}
    </div>
  );
};

export default ViewProfile;
