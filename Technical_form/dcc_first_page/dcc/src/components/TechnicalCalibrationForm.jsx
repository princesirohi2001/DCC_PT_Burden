import React, { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import '../css/technicalCalibrationForm.css';

const TechnicalCalibrationForm = () => {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [standard1, setStandard1] = useState('');
  const [standard2, setStandard2] = useState('');
  const [traceability, setTraceability] = useState('');
  const [principle, setPrinciple] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data;

          // Parse the CSV data without header validation
          const parsedData = data.map((row) => ({
            column1: isNaN(row[0]) ? row[0] : parseFloat(row[0]),
            column2: isNaN(row[1]) ? row[1] : parseFloat(row[1]),
            column3: isNaN(row[2]) ? row[2] : parseFloat(row[2]),
            column4: isNaN(row[3]) ? row[3] : parseFloat(row[3]),
          }));

          setCsvData(parsedData);
          setFileUploaded(true); // Set flag when file is uploaded
        },
        header: false, // Do not treat the first row as a header
        skipEmptyLines: true, // Skip empty lines
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        },
      });
    }
  };

  const isCalibrationFormValid = () => {
    return (
      temperature &&
      relativeHumidity &&
      standard1 &&
      standard2 &&
      traceability &&
      principle
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isCalibrationFormValid()) {
      navigate('/result', {
        state: {
          data: {
            temperature,
            relativeHumidity,
            standard1,
            standard2,
            traceability,
            principle,
            csvData,
          },
        },
      });
    } else {
      alert('Please fill all required fields before submitting.');
    }
  };

  return (
    <div className="technical-calibration-form-container">
      <div className="technical-calibration-form-wrapper">
        <h2>Calibration Form</h2>
        <form className="technical-calibration-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Temperature:</label>
            <input
              type="text"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="e.g., (25±2)°C"
            />
          </div>
          <div className="form-group">
            <label>Relative Humidity:</label>
            <input
              type="text"
              value={relativeHumidity}
              onChange={(e) => setRelativeHumidity(e.target.value)}
              placeholder="e.g., (50±10)%"
            />
          </div>
          <div className="form-group">
            <label>Standard Voltage Transformer:</label>
            <input
              type="text"
              value={standard1}
              onChange={(e) => setStandard1(e.target.value)}
              placeholder="e.g., ±0.0065%"
            />
          </div>
          <div className="form-group">
            <label>Automatic Instrument Transformer Test Set (used as PTTS):</label>
            <input
              type="text"
              value={standard2}
              onChange={(e) => setStandard2(e.target.value)}
              placeholder="e.g., ±0.002%-±0.008%"
            />
          </div>
          <div className="form-group">
            <label>Traceability of Standards Used:</label>
            <textarea
              value={traceability}
              onChange={(e) => setTraceability(e.target.value)}
              placeholder="Details of traceability"
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Principle/Methodology of Calibration:</label>
            <textarea
              value={principle}
              onChange={(e) => setPrinciple(e.target.value)}
              placeholder="Principle or methodology used"
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Upload CSV File:</label>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          </div>

          {fileUploaded && csvData.length > 0 && (
            <div className="form-group csv-table-container">
              <h3>Uploaded CSV Data:</h3>
              <table className="csv-table">
                <thead>
                  <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                    <th>Column 4</th>
                  </tr>
                </thead>
                <tbody>
                  {csvData.map(({ column1, column2, column3, column4 }, index) => (
                    <tr key={index}>
                      <td>{!isNaN(column1) ? column1.toFixed(2) : column1}</td>
                      <td>{!isNaN(column2) ? column2.toFixed(2) : column2}</td>
                      <td>{!isNaN(column3) ? column3.toFixed(2) : column3}</td>
                      <td>{!isNaN(column4) ? column4.toFixed(2) : column4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button type="submit" disabled={!isCalibrationFormValid()}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TechnicalCalibrationForm;