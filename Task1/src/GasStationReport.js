import React, { useState } from "react";
import * as XLSX from "xlsx";
import './GasStationReport.css'; // Import CSS file

const GasStationReport = () => {
  const [file, setFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);

  // State to check input errors
  const [error, setError] = useState({ start: false, end: false });
  const [fileUploaded, setFileUploaded] = useState(false); // State to check if a file is uploaded

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileUploaded(!!uploadedFile); // Update state if a file is present

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Convert data to a manageable format
        const formattedData = jsonData.slice(1).map((row) => ({
          time: row[0], // Transaction time
          amount: row[3], // Amount
        }));
        setTransactions(formattedData);
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  const handleCalculate = () => {
    // Check if inputs are empty
    setError({
      start: !startTime,
      end: !endTime,
    });

    if (!startTime || !endTime || !fileUploaded) return; // Stop if any input is empty

    // Convert input time to comparable format
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Calculate total amount in the specified time range
    const total = transactions.reduce((acc, transaction) => {
      const transactionTime = new Date(`1970-01-01T${transaction.time}:00`);
      if (transactionTime >= start && transactionTime <= end) {
        return acc + parseFloat(transaction.amount);
      }
      return acc;
    }, 0);

    setTotalAmount(total);
  };

  return (
    <div className="container">
      <h2>Gas Station Transaction Report</h2>

      {/* File Upload Section */}
      <div className={`upload-container ${!fileUploaded ? 'warning' : ''}`}>
        <input 
          type="file" 
          onChange={handleFileUpload} 
          className="file-input"
        />
        {file && <p className="file-name">{file.name}</p>}
      </div>

      <div>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setError((prev) => ({ ...prev, start: false })); // Reset error when input is provided
            }}
            className={error.start ? "input-error" : ""}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
              setError((prev) => ({ ...prev, end: false })); // Reset error when input is provided
            }}
            className={error.end ? "input-error" : ""}
          />
        </label>
      </div>

      <button onClick={handleCalculate}>Calculate Total</button>

      {totalAmount !== null && (
        <div>
          <h3>Total Amount: {totalAmount.toLocaleString()} VND</h3>
        </div>
      )}
    </div>
  );
};

export default GasStationReport;
