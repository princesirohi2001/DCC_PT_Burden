// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const ResultPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { data } = location.state || {};

//   if (!data) {
//     return <h2>No Data Available</h2>;
//   }

//   return (
//     <div className="result-page">
//       <h2>Calibration Result</h2>
//       <p><strong>Temperature:</strong> {data.temperature}</p>
//       <p><strong>Relative Humidity:</strong> {data.relativeHumidity}</p>
//       <p><strong>Standard Voltage Transformer:</strong> {data.standard1}</p>
//       <p><strong>Automatic Instrument Transformer Test Set:</strong> {data.standard2}</p>
//       <p><strong>Traceability:</strong> {data.traceability}</p>
//       <p><strong>Principle:</strong> {data.principle}</p>

//       <h3>Uploaded CSV Data</h3>
//       {data.csvData.length > 0 ? (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Indicated Value A</th>
//               <th>Measured Value A</th>
//               <th>Coverage Factor K</th>
//               <th>Uncertainty in Measurement (%)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.csvData.map((row, index) => (
//               <tr key={index}>
//                 <td>{!isNaN(row.column1) ? row.column1.toFixed(2) : row.column1}</td>
//                 <td>{!isNaN(row.column2) ? row.column2.toFixed(2) : row.column2}</td>
//                 <td>{!isNaN(row.column3) ? row.column3.toFixed(2) : row.column3}</td>
//                 <td>{!isNaN(row.column4) ? row.column4.toFixed(2) : row.column4}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No CSV Data Available</p>
//       )}

//       <button onClick={() => navigate(-1)}>Go Back</button>
//     </div>
//   );
// };

// export default ResultPage;

