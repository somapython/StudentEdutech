import React, { useState, useEffect} from "react";
import { FaDownload, FaUpload, FaUsers, FaBookReader,FaEdit,FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Papa from "papaparse"; 
// import pdfjsLib from "pdfjs-dist";
import { getDocument } from "pdfjs-dist"; 
import { useAuthContext } from '../Context/AuthContext';
import Toaster from "../Toaster";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [resultFile, setResultFile] = useState(null);
  const [paymentCount, setPaymentCount] = useState(0);
  const [toaster, setToaster] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  // const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  // const { examDetails, setExamDetails } = useContext(ExamContext);

  const navigate = useNavigate();
  const { setQuizData, addExamDetail } = useAuthContext();
  const options = ["Math", "Science", "Intelligence", "Computer","Geography","Marathi","English","Hindi","EVS","History"];

   useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleDownloadMessages = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate fetching data
      const csvContent =
        "data:text/csv;charset=utf-8,ID,Message\n" +
        messages.map((msg, idx) => `${idx + 1},${msg}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "messages.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(false);
      setToaster({ type: "success", message: "Message Downloaded successfully!" });
    }, 1500); 
    
  };

  const handleUploadFile = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUploadResultFile = (e) => {
    const uploadedResultFile = e.target.files[0];
    setResultFile(uploadedResultFile);
  };

  const parseTextToArray = (text) => {
    // Convert plain text into structured quiz data
    // return text.split("\n").map((line) => {
    //   const [question, optionA, optionB, optionC, optionD, correct] = line.split("|");
    //   return {
    //     question: question.trim(),
    //     choices: [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()],
    //     correct: correct.trim(),
    //   };
    // });

    // Split the text by "Question" (assuming each question starts with the word "Question")
  const questionsData = text.split('Question').filter(Boolean);
  
  // Map over each question data and format it
  return questionsData.map((questionData) => {
    const lines = questionData.split('\n').filter(Boolean);
    
    // Extract question details
    const id = parseInt(lines[0].replace('id: ', '').trim());
    const question = lines[1].replace('question: ', '').trim();
    const options = lines[2].replace('options: ', '').split(',').map(opt => opt.trim());
    const correct = lines[3].replace('correct: ', '').trim();
    
    return { id, question, options, correct };
  });
  };

  const processFile = async () => {
    if (!file) return;

    const fileType = file.type;

    if (fileType === "text/csv") {
      // CSV Parsing
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const data = result.data.map((row) => ({
            question: row.Question,
            choices: [row.OptionA, row.OptionB, row.OptionC, row.OptionD],
            correct: row.Correct,
          }));
          setQuizData(data);
        },
      });
    } else if (fileType === "text/plain") {
      // TXT Parsing
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const data = parseTextToArray(text);
        setQuizData(data);
      };
      reader.readAsText(file);
    } else if (fileType === "application/pdf") {
      // PDF Parsing
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdf = await getDocument({ data: e.target.result }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + "\n";
        }
        const data = parseTextToArray(text);
        setQuizData(data);
      };
      reader.readAsArrayBuffer(file);
      setToaster({ type: "success", message: "Sucessfully uploaded." });
    } else {
        setToaster({ type: "danger", message: "Unsupported file type. Please upload a .txt, .csv, or .pdf file." });
    }
  };

  const processResultFile = async () => {
    if (!file) return;

    const fileType = file.type;

    if (fileType === "text/csv") {
      // CSV Parsing
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const data = result.data.map((row) => ({
            question: row.Question,
            choices: [row.OptionA, row.OptionB, row.OptionC, row.OptionD],
            correct: row.Correct,
          }));
          setQuizData(data);
        },
      });
    } else if (fileType === "text/plain") {
      // TXT Parsing
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const data = parseTextToArray(text);
        setQuizData(data);
      };
      reader.readAsText(file);
    } else if (fileType === "application/pdf") {
      // PDF Parsing
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdf = await getDocument({ data: e.target.result }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + "\n";
        }
        const data = parseTextToArray(text);
        setQuizData(data);
      };
      reader.readAsArrayBuffer(file);
      alert("Sucessfully uploaded.");
      setToaster({ type: "success", message: "Sucessfully uploaded." });
    } else {
        setToaster({ type: "danger", message: "Unsupported file type. Please upload a .txt, .csv, or .pdf file." });
      alert("Unsupported file type. Please upload a .txt, .csv, or .pdf file.");
    }
  };

  const fetchPaymentCount = () => {
    setPaymentLoading(true);
    setTimeout(() => {
      // Replace with actual API call
      setPaymentCount(42); // Example value
      setPaymentLoading(false);
    }, 1500); // Simulate delay
  };

  const navigateToBack = () => {
    setBackLoading(true);
    navigate("/loading");
    setTimeout(() => {
      setBackLoading(false);
      navigate("/")
    }, 1500);
  };

  const downloadResultsCSV = () => {
    //localStorage.removeItem("examResultsCSV");
    
  // Retrieve the CSV content from localStorage
  const csvContent = localStorage.getItem("examResultsCSV");

  if (csvContent) {
    // const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "exam_results.csv"; 
    // link.click();
    setLoadingPDF(true);
    setTimeout(() => {

    const doc = new jsPDF();

    // Split the CSV content into rows
    const rows = csvContent.split("\n").map((row) => row.split(","));

    // Loop through each row and add it to the PDF
    const headers = rows.shift(); // Remove the first row as headers
    const data = rows; // Remaining rows are the data

    // Add a title to the PDF
    doc.setFontSize(16);
    doc.text("Exam Results", 14, 15);

    // Generate the table
    autoTable(doc, {
      head: [headers], // Table headers
      body: data, // Table data
      startY: 20, // Start table below the title
      styles: {
        cellPadding: 8,
        fontSize: 10,
        halign: "center", // Align text in the center
        valign: "middle", // Align text vertically in the middle
        lineWidth: 0.25, // Cell border thickness
      },
      headStyles: {
        fillColor: [0, 123, 255], // Highlight header in blue
        textColor: [255, 255, 255], // Header text in white
        fontStyle: "bold", // Bold header text
      },
      bodyStyles: {
        fillColor: (rowIndex, columnIndex) =>
          columnIndex === 3 // Highlight the "Correct Answers" column
            ? [220, 255, 220] // Light green
            : null,
            textColor: [0, 0, 0],
      },
      tableLineWidth: 0.5, // Ensure all table borders are consistent
      tableLineColor: [0, 0, 0],
    });

    doc.save("exam_results.pdf");
    setLoadingPDF(false);
    setToaster({ type: "success", message: "Results Downloaded successfully!" });
  }, 1500); 
  } else {
    console.error("No CSV data found in localStorage");
  }
};

  const handleModalSubmit = () => {
    if (!subject || !date || !name) {
      setToaster({ type: "danger", message: "Please fill in all required fields." });
      return;
    }
  //localStorage.removeItem("examDetails");
    const newExamDetail = { subject, name, date, details };
   const existingExamDetails = JSON.parse(localStorage.getItem("examDetails")) || [];
    existingExamDetails.push(newExamDetail);
    localStorage.setItem("examDetails", JSON.stringify(existingExamDetails));
    addExamDetail(newExamDetail);
    setToaster({ type: "success", message: "Exam details submitted successfully!" });
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSubject("");
    setName("");
    setDetails("");
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  };

  const Spinner = () => (
    <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
  );

  return (
    <div
      className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white"
    >
      <h1 title={"Admin Panel"} className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">Admin Panel</h1>

      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3">
        {/* Download Messages */}
        <div className="p-4 md:p-6 bg-white text-blue-600 rounded-lg shadow-lg transform transition hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 title={"Download Messages"} className="text-sm md:text-xl font-semibold">Download Messages</h2>
            <FaDownload title={"Download Messages"} className="text-lg md:text-3xl" />
          </div>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-700">Download messages as a CSV file for record-keeping.</p>
          <button title={"Download Messages"}
            onClick={handleDownloadMessages}
            className="mt-2 md:mt-4 w-full bg-blue-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            {loading ? <Spinner /> : "Download Messages"}
          </button>
        </div>

        {/* Upload Questions */}
        <div className="px-2 py-4 md:p-6 bg-white text-purple-600 rounded-lg shadow-lg transform transition hover:scale-105">
        <div className="flex items-center justify-between">
            <h2 title={"Upload Questions"} className="text-sm md:text-xl font-semibold">Upload Questions</h2>
            <FaUpload title={"Upload Questions"} className="text-lg md:text-3xl" />
        </div>
        <p title={"Upload Questions"} className="mt-1 md:mt-2 text-xs md:text-sm text-gray-700">
            Upload text files to add questions for the Test.
        </p>
        <div title={"Upload Questions"} className="mt-2 md:mt-4 flex items-center gap-2 md:gap-4">
            <label className="w-full bg-purple-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2 cursor-pointer">
            <FaUpload /> Upload <span className="hidden">File</span>
            <input
                type="file"
                accept=".txt,.csv,.pdf"
                onChange={handleUploadFile}
                className="hidden"
            />
            </label>
            <button title={"Submit"}
            onClick={processFile}
            className="w-full  bg-purple-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-purple-600"
            >
            Submit <span className="hidden">File</span>
            </button>
        </div>
        {file && (
            <p className="mt-1 md:mt-2 text-xs text-green-600">Uploaded: {file.name}</p>
        )}
        </div>

        {/* Payment Count */}
        <div className="p-4 md:p-6 bg-white text-green-600 rounded-lg shadow-lg transform transition hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 title={"Payment Count"} className="text-base md:text-xl font-semibold">Payment Count</h2>
            <FaUsers title={"Payment Count"} className="text-xl md:text-3xl" />
          </div>
          <p title={"Payment Count"} className="mt-1 md:mt-2 text-xs md:text-sm text-gray-700">View the total number of payments made by users.</p>
          <button title={"Payment Count"}
            onClick={fetchPaymentCount}
            className="mt-2 md:mt-4 w-full bg-green-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
          >
            {paymentLoading ? <Spinner /> : `View Payments (${paymentCount})`}
          </button>
        </div>

         {/* Upcoming Exams Upload Modal */}
         <div className="p-4 md:p-6 bg-white text-red-600 rounded-lg shadow-lg transform transition hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 title={"Update Exam Details"} className="text-sm md:text-xl font-semibold">Update Exam Details</h2>
            <FaEdit title={"Update Exam Details"} className="text-lg md:text-3xl" />
          </div>
          <p title={"Update Exam Details"} className="mt-1 md:mt-2 text-xs md:text-sm text-gray-700"> Update Exam Details for upcoming exams.</p>
          <button title={"Update Exam Details"}
             onClick={() => setIsModalOpen(true)}
            className="mt-2 md:mt-4 w-full bg-red-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
          >
            
            {backLoading ? <Spinner /> : "Update Exam Details"}
          </button>
        </div>

        {/* Upload Results */}
         {/* <div className="p-4 md:p-6 bg-white text-cyan-600 rounded-lg shadow-lg transform transition hover:scale-105">
            <div className="flex items-center justify-between">
                <h2 className="text-base md:text-xl font-semibold">Upload Results</h2>
                <FaUpload className="text-xl md:text-3xl" />
            </div>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-700">
                Upload csv files to find Results.
            </p>
            <div className="mt-2 md:mt-4 flex items-center gap-4">
                <label className="w-full md:w-auto bg-cyan-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-2 cursor-pointer">
                <FaUpload /> Upload File
                <input
                    type="file"
                    accept=".txt,.csv,.pdf"
                    onChange={handleUploadResultFile}
                    className="hidden"
                />
                </label>
                <button
                onClick={processResultFile}
                className="bg-cyan-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-cyan-600"
                >
                Submit File
                </button>
            </div>
            {resultFile && (
                <p className="mt-2 text-xs text-rose-600">Uploaded: {resultFile.name}</p>
            )}
            </div> */}

{/* Download Results */}
        <div className="p-4 md:p-6 bg-white text-pink-600 rounded-lg shadow-lg transform transition hover:scale-105">
                <div className="flex items-center justify-between">
                    <h2 title={"Download Results"} className="text-sm md:text-xl font-semibold">Download Results</h2>
                    <FaDownload title={"Download Results"} className="text-lg md:text-3xl" />
                </div>
                <p title={"Download Results"} className="mt-1 md:mt-2 text-xs md:text-sm text-gray-700">Download Results.</p>
                <button title={"Download Results"}
                    onClick={downloadResultsCSV}
                    className="mt-2 md:mt-4 w-full bg-pink-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-pink-600 flex items-center justify-center gap-2"
                >
                    {loadingPDF ? <Spinner /> : "Download Result"}
                </button>
                </div>

        {/* Navigate to Student App UI */}
        <div className="p-4 md:p-6 bg-white text-yellow-600 rounded-lg shadow-lg transform transition hover:scale-105">
          <div className="flex items-center justify-between">
            <h2 title={"Home"} className="text-sm md:text-xl font-semibold">Home</h2>
            <FaBookReader title={"Home"} className="text-lg md:text-3xl" />
          </div>
          <p title={"Home"} className="mt-1 md:mt-2 text-xs md:text-sm text-gray-700">Back To Home.</p>
          <button title={"Home"}
            onClick= {navigateToBack}
            className="mt-2 md:mt-4 w-full bg-yellow-500 text-white text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2"
          >
            
            {backLoading ? <Spinner /> : "Back"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-lg w-[80%] md:w-96 relative">
             <button title={"Close"}
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
            >
              <FaTimes size={16} />
            </button>
            <h3 title={"Enter Exam Details"} className="text-lg md:text-xl font-bold mb-2 md:mb-4">Enter Exam Details</h3>
             <div className="mb-2 md:mb-4">
              <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject name"
                maxLength={20}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-2 md:mb-4">
              <label className="block text-sm font-medium mb-1 md:mb-2">Subject</label>
               <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Select a Subject
                </option>
                {options.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                    type="date"
                    value={date ? moment(date, "DD-MM-YYYY").format("YYYY-MM-DD") : ""}
                    onChange={(e) => {
                    const formattedDate = moment(e.target.value, "YYYY-MM-DD").format("DD-MM-YYYY");
                    setDate(formattedDate);
                    }}
                    className="w-full border rounded-lg p-2"
                />
            </div> */}
            <div className="mb-2 md:mb-4">
                <label className="block text-sm font-medium mb-1 md:mb-2">Date and Time</label>
                <input
                    type="datetime-local"
                    value={
                    date
                        ? moment(date, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss")
                        : ""
                    }
                    onChange={(e) => {
                    const formattedDateTime = moment(e.target.value, "YYYY-MM-DDTHH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
                    setDate(formattedDateTime);
                    }}
                    className="w-full border rounded-lg p-2"
                />
            </div>
           <div className="mb-2 md:mb-4">
              <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter any additional details"
                maxLength={100}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2 md:gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                title={"Cancel"}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                 title={"Submit"}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
              {toaster && <Toaster type={toaster.type} message={toaster.message} onClose={() => setToaster(null)} />}
            </div>
          </div>
        </div>
      )}
       {toaster && (
            <Toaster
            type={toaster.type}
            message={toaster.message}
            onClose={() => setToaster(null)}
            />
        )}
    </div>
  );
};

export default Admin;
