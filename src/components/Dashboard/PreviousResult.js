import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import './PreviousResult.css';
import "react-datepicker/dist/react-datepicker.css"
import { FaBook, FaTimes, FaFlask, FaHistory, FaPenAlt, FaSpinner, FaFilter, FaCalculator,
    FaLanguage,
    FaGlobe,
    FaAtom,
    FaPalette,
    FaBalanceScale,
    FaMicroscope,
    FaBusinessTime,
    FaGraduationCap,
    FaMusic,
    FaRunning,
    FaBrain,
    FaChartLine,
    FaUniversity,} from "react-icons/fa";
import moment from "moment";
import Toaster from "../Toaster";


const PreviousExamResults = () => {
    const examResults = [
        { name: "Maths", date: "20-12-2024", marks: 85, totalMarks: 100, grade: "A", icon: <FaCalculator /> },
        { name: "Science", date: "18-12-2024", marks: 78, totalMarks: 100, grade: "B+", icon: <FaFlask /> },
        { name: "History", date: "15-12-2024", marks: 92, totalMarks: 100, grade: "A+", icon: <FaHistory /> },
        { name: "English", date: "10-12-2024", marks: 74, totalMarks: 100, grade: "B", icon: <FaLanguage /> },
        { name: "Geography", date: "15-12-2024", marks: 88, totalMarks: 100, grade: "A", icon: <FaGlobe /> },
        { name: "Physics", date: "11-12-2024", marks: 90, totalMarks: 100, grade: "A+", icon: <FaAtom /> },
        { name: "Chemistry", date: "12-12-2024", marks: 76, totalMarks: 100, grade: "B+", icon: <FaFlask /> },
        { name: "Biology", date: "13-12-2024", marks: 80, totalMarks: 100, grade: "A", icon: <FaMicroscope /> },
        { name: "Art", date: "14-12-2024", marks: 67, totalMarks: 100, grade: "B", icon: <FaPalette /> },
        { name: "Computer", date: "16-12-2024", marks: 94, totalMarks: 100, grade: "A+", icon: <FaBook /> },
        { name: "Philosophy", date: "17-12-2024", marks: 72, totalMarks: 100, grade: "B", icon: <FaBalanceScale /> },
        { name: "Music", date: "18-12-2024", marks: 85, totalMarks: 100, grade: "A", icon: <FaMusic /> },
        { name: "Physical Education", date: "19-12-2024", marks: 90, totalMarks: 100, grade: "A+", icon: <FaRunning /> },
        { name: "Political Science", date: "11-12-2024", marks: 68, totalMarks: 100, grade: "B", icon: <FaUniversity /> },
        { name: "Sociology", date: "12-12-2024", marks: 76, totalMarks: 100, grade: "B+", icon: <FaGraduationCap /> },
        { name: "Economics", date: "13-12-2024", marks: 91, totalMarks: 100, grade: "A+", icon: <FaChartLine /> },
        { name: "Psychology", date: "14-12-2024", marks: 82, totalMarks: 100, grade: "A", icon: <FaBrain /> },
        { name: "Business Studies", date: "16-12-2024", marks: 77, totalMarks: 100, grade: "B+", icon: <FaBusinessTime /> },
        { name: "Law", date: "17-12-2024", marks: 85, totalMarks: 100, grade: "A", icon: <FaBalanceScale /> },
        { name: "Statistics", date: "19-12-2024", marks: 93, totalMarks: 100, grade: "A+", icon: <FaCalculator /> },
        { name: "EVS", date: "10-12-2024", marks: 70, totalMarks: 100, grade: "B", icon: <FaPenAlt /> },
       // { name: "Anthropology", date: "22-11-2024", marks: 79, totalMarks: 100, grade: "B+", icon: <FaBrain /> },
        { name: "Astronomy", date: "19-12-2024", marks: 88, totalMarks: 100, grade: "A", icon: <FaAtom /> },
        { name: "Civics", date: "18-12-2024", marks: 76, totalMarks: 100, grade: "B+", icon: <FaUniversity /> },
        { name: "French", date: "17-12-2024", marks: 92, totalMarks: 100, grade: "A+", icon: <FaLanguage /> },
      ];
      
  const [loading, setLoading] = useState(false);
  const [loadingNew, setLoadingNew] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(moment().subtract(1, "months").toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(""); 
  const [appliedGrade, setAppliedGrade] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({ subject: "", grade: "" });
  const [toaster, setToaster] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleBack = () => {
    setLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 500);
  };

   const handleNextPage = async () => {
    if (currentPage * itemsPerPage < examResults.length) {
        setLoading(true);
        setLoadingNew(true);
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          setLoadingNew(false);
          setLoading(false);
        }, 200); // Simulating an API delay
        
       // setCurrentPage(currentPage + 1);  
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
        setLoading(true);
        setLoadingNew(true);
        setTimeout(() => {
          setCurrentPage(currentPage - 1);
          setLoadingNew(false);
          setLoading(false);
        }, 200);
            
        
        //setCurrentPage(currentPage - 1);
      
    }
  };

  const handleSearchChange = (e) => {
    const searchTermData = e.target.value;
    if (searchTermData.length < 3 && searchTermData.length !== 0) {
      setSearchTerm(searchTermData);
      setToaster({ type: "danger", message: "Minimum three characters required" });
    } else {
        setLoadingNew(true); 
        setSearchTerm(searchTermData);
        setTimeout(() => {
            setLoadingNew(false); // Hide loader after processing
        }, 200);
        setToaster(null);
    }
  };

  const handleDateChange = (date, isStart) => {
    console.log(date)
    if (isStart) {
      if (date > endDate) {
        setToaster({ type: "danger", message: "Start date cannot be after end date." });
      } else {
        setStartDate(date);
      }
    } else {
      if (date < startDate) {
        setToaster({ type: "danger", message: "End date cannot be before start date." });
      } else {
        setEndDate(date);
      }
    }
  };
  const calculatePercentile = (marks) => {
    // For simplicity, assuming the maximum percentile for full marks (100) is 100
    return ((marks / 100) * 100).toFixed(2);
  };

  const filteredResults = examResults.filter((exam) => {
    // console.log("5555",searchTerm);

    const matchesSearchTerm = searchTerm.length > 3 ? exam.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesGrade = appliedGrade ? exam.grade === appliedGrade : true;
    const matchesDate = (!startDate || moment(exam.date, "DD-MM-YYYY").isSameOrAfter(moment(startDate)))
      && (!endDate || moment(exam.date, "DD-MM-YYYY").isSameOrBefore(moment(endDate)));
    return matchesSearchTerm && matchesGrade && matchesDate;
  });

  const handleApplyClick = () => {
    setLoadingNew(true);
    setTimeout(() => {
      setLoadingNew(false); 
    }, 200); 
  };


  const currentResults = filteredResults.slice((currentPage - 1) * itemsPerPage,currentPage * itemsPerPage);


  return (
    <div className="p-2 bg-gray-50 min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto">
      {loadingNew && (
        <div className="flex justify-center items-center my-4 w-[90vw] h-[90vh]">
          <FaSpinner className="text-indigo-500 text-4xl animate-spin" />
        </div>
      )}
     {!loadingNew && (
      <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 px-2 md:px-6 py-4 rounded-t-lg shadow-lg">
          <button
            onClick={handleBack}
            className="absolute left-6 md:left-16 text-white hover:underline text-sm md:text-base font-semibold rounded-lg transition"
          >
            &larr; Back
          </button>
          <h2 className="ml-20 md:ml-0 text-base md:text-3xl font-bold text-center text-white mb-0 md:mb-2">
            Previous Exams Results
          </h2>
        </div>
          )} 
        {/* Loader */}
      
        {/* <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Previous Exam Results</h2> */}
 		{/* Search Bar */}
         {!loadingNew && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-1 mb-1 mx-2 md:mx-8">
		    <div className="flex justify-center space-x-2 md:space-x-4 ml-0 md:ml-12 md:ml-0 mt-0 md:mt-1">
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => handleDateChange(date, true)}
                        minDate={moment().subtract(90, "days").toDate()}
                        maxDate={new Date()}
                        className="mt-1 p-1 md:p-2 border rounded-md"
                        dateFormat="dd-MM-yyyy"
                    />
                </div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => handleDateChange(date, false)}
                        minDate={moment().subtract(90, "days").toDate()}
                        maxDate={new Date()}
                        className="mt-1 p-1 md:p-2 border rounded-md"
                        dateFormat="dd-MM-yyyy"
                    />
                </div>
            </div>
            <div className="flex flex-row w-full max-w-md">
                <input type="text" placeholder="Search by Subject..."
                    value={searchTerm} onChange={handleSearchChange}
                    className="md:px-4 py-1 md:py-2 text-sm md:text-lg border border-gray-300 rounded-l w-[80%] md:w-full md:max-w-md" />
                <button onClick={() => setFilterModalOpen(true)}
                    className="ml-4 px-4 py-0 bg-indigo-500 text-white rounded-lg h-[30px] md:h-[40px] mt-3 md:mt-3" >
                    {loading ? <FaSpinner className="inline animate-spin" /> : <FaFilter className=""/>}
                </button>
                 {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
            </div>
        </div>
  )} 
        {/* Results Table */}
        {!loadingNew && (
        <div className="overflow-x-auto max-w-full">
        {filteredResults.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-xs md:text-lg">
                <tr>
                    <th className="px-2 py-5
                    md:py-4 md:px-6 text-left text-gray-700">Subject</th>
                    <th className="px-2 py-5
                    md:py-4 md:px-6 text-left text-gray-700">Date</th>
                    <th className="px-2 py-5
                    md:py-4 md:px-6 text-left text-gray-700">Marks</th>
                    <th className="px-2 py-5
                    md:py-4 md:px-6 text-left text-gray-700">Grade</th>
                    <th className="px-2 py-5
                    md:py-4 md:px-6 text-left text-gray-700">Result</th>
                </tr>
            </thead>
            <tbody className="text-xs md:text-lg overflow-auto max-h-96">
              {currentResults.map((exam, index) => (
                <tr key={index} className="border-t border-gray-200">
                    <td className="px-2 py-5 md:py-4 md:px-6 text-gray-800 flex items-center">
                        <span className="text-cyan-500" >{exam.icon }</span>
                        <span className="ml-2 md:ml-3 truncate max-w-[40px] md:max-w-full overflow-hidden whitespace-nowrap">{exam.name}</span>
                    </td>
                    <td className="px-2 py-5 md:py-4 md:px-6 text-gray-600">{exam.date}</td>
                    <td className="px-2 py-5 md:py-4 md:px-6 text-gray-800">{exam.marks} / {exam.totalMarks}</td>
                    <td className="px-2 py-5 md:py-4 md:px-6 text-gray-800">{exam.grade}</td>
                    <td className="px-2 py-5 md:py-4 md:px-6">
                        <span className={`px-3 py-1 rounded-full text-white ${
                            exam.marks >= 50 ? "bg-green-500" : "bg-red-500"
                         }`} >
                      {exam.marks >= 50 ? "Passed" : "Failed"}
                        </span>
                    </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        ):(
            <div className="p-8 m-8 md:p-14 md:m-14 bg-red-100 rounded-lg shadow-lg col-span-2 lg:col-span-3 text-center flex flex-col items-center justify-center">
               <FaSpinner className="text-6xl text-red-500 mb-6 animate-spin" />
              <h3 className="text-base md:text-xl font-bold text-gray-800">No Data Found</h3>
              {/* <p className="text-base md:text-lg text-gray-600">Please adjust the date range and try again.</p> */}
            </div>
          )}

        </div>
     
         )} 
        
        {/* Pagination */}
        
        {!loadingNew &&filteredResults.length > 0 && (
        <div className="flex justify-between items-center py-2 mt-2 md:mt-0 md:py-4">
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 md:py-2 text-xs md:text-lg bg-blue-800 text-white rounded-lg disabled:opacity-50"
            disabled={currentPage === 1}
          >
           {loading ? <FaSpinner className="inline animate-spin" /> : "Previous"}
          </button>
          <span className="text-xs md:text-xl text-gray-700">
            Page {currentPage} of {Math.ceil(filteredResults.length / itemsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 md:py-2 text-xs md:text-lg bg-blue-800 text-white rounded-lg disabled:opacity-50"
            disabled={currentPage * itemsPerPage >= filteredResults.length}
          >
           {loading ? <FaSpinner className="inline animate-spin" /> : "Next"}
          </button>
        </div>
          )}
      
		 {/* Filter Modal */}
		 {filterModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            
            <div className="bg-white p-6 rounded-lg w-80 md:w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="text-gray-200 px-3 py-2 hover:bg-gray-300 transition-all duration-300"
                >
                  <FaTimes />
                </button>
            </div>
              {/* Subject Filter */}
              <div className="mt-4">
                <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} >
                  <option value="">All Grades</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                >
                  {loading ? <FaSpinner className="inline animate-spin" /> : "Close"}
                </button>
                <button
                 onClick={() => {setAppliedGrade(selectedGrade);
                    setFilterModalOpen(false);
                    handleApplyClick();
                 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                 {loading ? <FaSpinner className="inline animate-spin" /> : "Apply"}
                </button>
				{toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default PreviousExamResults;
