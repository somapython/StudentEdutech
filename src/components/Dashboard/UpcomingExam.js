import React, { useState , useEffect} from "react";
import DatePicker from "react-datepicker";
import './UpcomingExam.css';
import moment from "moment";
import { FaBookOpen, FaFlask, FaGlobe, FaSpinner, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Toaster from "../Toaster";
import { useAuthContext  } from "../Context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";

const UpcomingExams = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(moment().add(1, "months").toDate());
  const [loadingNew, setLoadingNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredExams, setFilteredExams] = useState([]);
  const [toaster, setToaster] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const { addExamDetail } = useAuthContext();
  const getExamDetails = JSON.parse(localStorage.getItem("examDetails")) || [];

  const [exams,setExams] = useState([
    { name: "Mathematics", date: "10-01-2025 05:00:00", subject: "Math", details: "Mathematics final term exam." },
    { name: "Science", date: "27-12-2024 07:00:00", subject: "Physics", details: "Physics practical assessment." },
    { name: "History", date: "28-12-2024 04:00:00", subject: "World History", details: "World History exam on major events." },
    { name: "English", date: "29-12-2024 06:00:00", subject: "Literature", details: "Literature exam covering poetry and prose." },
    { name: "Science", date: "25-12-2024 03:00:00", subject: "Biology", details: "Biology exam focusing on genetics." },
    { name: "Science", date: "22-01-2025 09:00:00", subject: "Chemistry", details: "Chemistry theoretical and practical exam." },
    { name: "Geography", date: "13-02-2025 11:00:00", subject: "Geography", details: "Geography test on world maps and climates." },
    { name: "Economics", date: "14-03-2025 05:00:00", subject: "Economics", details: "Economics exam on microeconomics." },
    { name: "Science", date: "15-01-2025 03:00:00", subject: "Biology", details: "Biology exam focusing on genetics." },
    { name: "Science", date: "20-01-2025 09:00:00", subject: "Chemistry", details: "Chemistry theoretical and practical exam." },
    { name: "Geography", date: "08-01-2025 11:00:00", subject: "Geography", details: "Geography test on world maps and climates." },
    { name: "Economics", date: "14-01-2025 05:00:00", subject: "Economics", details: "Economics exam on microeconomics." },
  ]);

  const navigate = useNavigate();
  const examsPerPage = 6;

  useEffect(() => {
    handleFilter();  // Apply filter immediately on page load if dates are set
  }, []);

const handleFilter = () => {
  if (endDate && startDate && moment(endDate).isBefore(moment(startDate))) {
    setToaster({ type: "danger", message: "End date cannot be earlier than start date!" });
    return;
  }

  setLoadingNew(true);
  setTimeout(() => {
    setLoadingNew(false);
  }, 200);
  setToaster(null);

  const updatedExams = [...exams, ...getExamDetails];

  const uniqueExams = Array.from(new Map(updatedExams.map(exam => [exam.id, exam])).values());

  const currentDate = moment().startOf("day"); 
  const filtered = exams.filter((exam) => {
    const examDate = moment(exam.date, "DD-MM-YYYY HH:mm:ss");
    const matchesDate =
      examDate.isSameOrAfter(moment(startDate).startOf("day")) &&
      examDate.isSameOrBefore(moment(endDate).endOf("day")) &&
      examDate.isSameOrAfter(currentDate); 
    return matchesDate;
  });

  if (filtered.length === 0) {
    setToaster({ type: "danger", message: "No exams found in the selected date range!" });
    setFilteredExams([]); 
    return;
  }
  const sortedFiltered = filtered.sort((a, b) => {
    return moment(a.date, "DD-MM-YYYY HH:mm:ss").toDate() - moment(b.date, "DD-MM-YYYY HH:mm:ss").toDate();
  });
  
  // setExams(uniqueExams);
  setFilteredExams(sortedFiltered);
  setCurrentPage(1); 
};

  const displayedExams = filteredExams.length > 0 ? filteredExams : exams;
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = displayedExams.slice(indexOfFirstExam, indexOfLastExam);
 
  const totalPages = Math.ceil(displayedExams.length / examsPerPage);

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 500);
  };

  const handlePageChange = (pageNumber) => {
    setLoadingNew(true);
    setTimeout(() => {
      setLoadingNew(false); 
      setCurrentPage(pageNumber);
    }, 200); 
    // setCurrentPage(pageNumber);
  };

  const openModal = (exam) => {
    setSelectedExam(exam);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedExam(null);
  };

  return (
    <div className="p-2 bg-gray-50 min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
       {loadingNew && (
        <div className="flex justify-center items-center my-4 w-[90vw] h-[90vh]">
          <FaSpinner className="text-indigo-500 text-4xl animate-spin" />
        </div>
      )}
       {!loadingNew && (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 px-2 md:px-6 py-4 rounded-t-lg shadow-lg">
          <button title={"Back"}
            onClick={handleBack}
            className="absolute left-4 md:left-16 text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
          >
            &larr; Back
          </button>
          <h2 title={"Upcoming Exams"} className="ml-4 text-base md:text-3xl font-bold text-center text-white mb-0 md:mb-2">
            Upcoming Exams
          </h2>
        </div>

        {/* Date Range Picker */}
        <div className="mt-4 md:mt-4 flex justify-center space-x-2 md:space-x-4 ml-12 md:ml-0">
          <div title={startDate}>
            <label className="block text-gray-700 text-sm md:text-lg font-semibold">Start Date:</label>
            <DatePicker
              selected={startDate}
              minDate={new Date()}
              maxDate={moment().add(90, "days").toDate()}
              onChange={(date) => setStartDate(date)}
              className="mt-1 p-1 md:p-2 border rounded-md"
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <div title={endDate}>
            <label className="block text-gray-700 text-sm md:text-lg font-semibold">End Date:</label>
            <DatePicker
              selected={endDate}
              minDate={new Date()}
              maxDate={moment().add(90, "days").toDate()}
              onChange={(date) => setEndDate(date)}
              className="mt-1 p-1 md:p-2 border rounded-md"
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <div className="flex items-end">
            <button title={"Apply"}
              onClick={handleFilter}
              className="mt-1 md:mt-0 mb-3 bg-green-500 text-white py-2 px-2 md:px-4 text-xs md:text-base rounded-md hover:bg-green-600"
            >
              {loading ? <FaSpinner className="inline animate-spin" /> : "Apply"}
            </button>
            {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
          </div>
        </div>

        {/* Exam Cards */}
        <div className="p-0 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {filteredExams.length > 0 ? (
          currentExams.map((exam, index) => (
            <div
              key={index}
              className={`p-2 md:p-4 flex flex-col rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${
                index % 3 === 0
                  ? "bg-pink-400"
                  : index % 3 === 1
                  ? "bg-cyan-400"
                  : "bg-yellow-400"
              }`}
            >
              <div>
                <div className="flex space-x-4">
                    <div className="text-4xl text-white">
                        {index % 3 === 0 ? (
                        <FaBookOpen size={24} />
                        ) : index % 3 === 1 ? (
                        <FaFlask size={24} />
                        ) : (
                        <FaGlobe size={24}/>
                        )}
                    </div>
                    <h3 title={exam.subject}
                        className={`text-base md:text-xl font-semibold ${
                        index % 3 === 0
                            ? "text-yellow-400"
                            : index % 3 === 1
                            ? "text-violet-800"
                            : "text-violet-800"
                        }`}
                    >
                        {exam.subject}
                    </h3>
                </div>
                <p  title={exam.subject}
                  className={`text-sm m-0 ml-4 ${
                    index % 3 === 0
                      ? "text-yellow-400"
                      : index % 3 === 1
                      ? "text-indigo-900"
                      : "text-sky-800"
                  }`}
                >
                  {exam.subject}
                </p>
                <p  title={exam.date} className="text-black-800 text-sm md:text-base mt-1 md:mt-2 ml-4 m-0">
                  {exam.date}
                </p>
              </div>
              <button title={"View Details"} onClick={() => openModal(exam)} className="mt-2 md:mt-4 text-sm md:text-xl bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900">
                View Details
              </button>
            </div>
          ))
        ) : (
          <div title={"No Exams Found"} className="p-8 m-8 md:p-14 md:m-14 bg-red-100 rounded-lg shadow-lg col-span-2 lg:col-span-3 text-center flex flex-col items-center justify-center">
             <FaSpinner className="text-6xl text-red-500 mb-6 animate-spin" />
            <h3 className="text-base md:text-xl font-bold text-gray-800">No Exams Found</h3>
            <p className="text-base md:text-lg text-gray-600">Please adjust the date range and try again.</p>
          </div>
        )}
        </div>

        {/* Pagination */}
        {filteredExams.length > 0 && (
        <div className="flex justify-center mt-1 md:mt-2">
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button title={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`py-1 px-3 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-800 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
       )}
        {/* Modal for Exam Details */}
        {modalVisible && selectedExam && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 title={selectedExam.name} className="text-2xl font-bold text-gray-800">{selectedExam.name}</h2>
            <button title={"Close"}
              onClick={closeModal}
              className="text-gray-200 px-3 py-2 hover:bg-gray-300 transition-all duration-300"
            >
              <FaTimes />
            </button>
          </div>

          {/* Icon and Subject Row */}
          <div className="flex items-center mb-4 space-x-4">
            <div className="text-3xl text-blue-500">
              {selectedExam.subject === "Maths" ? (
                <FaFlask className="animate-spin"/>
              ) : selectedExam.subject === "Science" ? (
                <FaBookOpen className="animate-spin"/>
              ) : (
                <FaGlobe className="animate-spin"/>
              )}
            </div>
            <div>
              <h3 title={selectedExam.subject} className="text-xl font-semibold text-gray-700">
                Subject: {selectedExam.subject}
              </h3>
              <p title={selectedExam.date} className="text-sm text-gray-500">Date: {selectedExam.date}</p>
            </div>
          </div>

          {/* Exam Details */}
          <div title={selectedExam.details} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Details:</h3>
            <p className="text-md text-gray-800">{selectedExam.details}</p>
          </div>

          <button title={"OK"}
            onClick={closeModal}
            className="mt-4 text-base md:text-lg font-semibold bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-400 ml-auto float-right"
          >
            OK
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default UpcomingExams;
