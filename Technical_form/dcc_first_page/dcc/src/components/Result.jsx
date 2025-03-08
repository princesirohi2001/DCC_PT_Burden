import React from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../css/result.css';
import '../css/template.css';

const Result = () => {
  const location = useLocation();
  const formData = location.state?.data || {};
  const {
    temperature = '',
    relativeHumidity = '',
    standard1 = '',
    standard2 = '',
    traceability = '',
    principle = '',
    csvData = [],
    case_no = '',
    category = '',
    subcategory = '',
    text3 = '',
    date1 = '',
    date2 = '',
    text1 = '',
    text2 = '',
    results = ''
  } = formData;

  const handleDownload = async () => {
    const element = document.getElementById('pdf-content');
    const canvas = await html2canvas(element, { allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('TechnicalCalibrationForm.pdf');
  };

  return (
    <div className='container'>
      <div className="sheet-outer A4 overflow-auto">
        <section id="pdf-content" className="sheet padding-5mm overflow-auto">
          <div id="top">
            <div id="imgntext">
              <div id="img">
                <div id="img1">
                  <img src="https://th.bing.com/th?id=OIP.agGpskq_U9Mx5uM_AE_NogHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Logo 1" />
                </div>
                <div id="headingntext">
                  <div id="heading">
                    <div id="h3-1"><h3>सीएसआईआर-राष्ट्रीय भौतिक प्रयोगशाला</h3></div>
                    <div><h3>CSIR-NATIONAL PHYSICAL LABORATORY</h3></div>
                  </div>
                  <div id="heading-text">
                    <div>(वैज्ञानिक एवं औद्योगिक अनुसंधान परिषद्)</div>
                    <br />
                    <div>(Council of Scientific and Industrial Research)</div>
                  </div>
                </div>
                <div id="img2">
                  <img src="https://th.bing.com/th?id=OIP.VTzv9_HKoFQdtG8Q-ggsIgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Logo 2" />
                </div>
              </div>
              <div id="top-text">
                <p>राष्ट्रीय माप विज्ञान संस्थान (एनपीएल), भारत</p>
                <br />
                <p>(National Metrology Institute (NMI), Member BIPM and Signatory CIPM-MRA)</p>
                <br />
                <p>डॉ. के. एस. कृष्णन मार्ग, नई दिल्ली-110012, भारत</p>
                <br />
                <p>Dr. K. S. Krishnan Marg, New Delhi-110012, INDIA</p>
                <br />
                <p>दूरभाष/Phone: 91-11-4560 8441, 8589, 8610, 9447, फैक्स/ Fax: 91-11-4560 8448</p>
                <br />
                <p>ई-मेल/ E-mail: cfct@nplindia.org, वेबसाईट / Website: www.nplindia.org</p>
              </div>
            </div>
            <div id="top-table">
              <table>
                <thead>
                  <tr id="top-row">
                    <th>
                      <p>अंशांकन प्रमाण पत्र</p>
                      <p>CALIBRATION CERTIFICATE<br />Voltage Transformer<br />Sr.</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="bottom-row">
                    <th><span>प्रमाणपत्र संख्या/Certificate No.</span><br />{case_no}/{category}{subcategory}/{text3}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="top-below-table">
              <table>
                <thead>
                  <tr>
                    <th id="th-1">दिनांक/Date<br />{date1}</th>
                    <th>अगले अंशांकन के लिए अनुशंसित तिथि<br />Recommended date for next calibration<br />{date2}</th>
                    <th>पृष्ठ/Page<br />{text1}</th>
                    <th>कुल पृष्ठ/Total pages<br />{text2}</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div id="middle-table">
            <table>
              <tbody>
                <tr>
                  <td>1. Calibrated for</td>
                  <td>:</td>
                  <td>M/s Electrical Research & Testing Organization(ERTO)</td>
                </tr>
                <tr>
                  <td>2. Description & Identification of item under calibration</td>
                  <td>:</td>
                  <td>Precision Grade Voltage Transformer</td>
                </tr>
                <tr>
                  <td>3. Environmental Conditions</td>
                  <td>:</td>
                  <td>(i)Temperature : {temperature}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>(ii)Relative Humidity: {relativeHumidity}</td>
                </tr>
                <tr>
                  <td>4. Standards used <br />Associated uncertainty</td>
                  <td>:</td>
                  <td>(i)Standard Voltage Transformer: {standard1}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>(ii)Automatic Instrument Transformer Test Set (used as PTTS): {standard2}</td>
                </tr>
                <tr>
                  <td>5. Traceability of Standards <br />used</td>
                  <td>:</td>
                  <td>{traceability}</td>
                </tr>
                <tr>
                  <td>6. Principle/Methodology of calibration<br />& Calibration Procedure number</td>
                  <td>:</td>
                  <td>{principle}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3> Result:</h3>
          <h4>The Current Injection Test Set bearing  S. No. 299/1357 has  been calibrated upto  4500A at 50 Hz by using Standard Current Transformer ratio of 2500A/1A and 5000A/1A and Standard Digital Multimeter. The results are tabulated below:</h4>
          
          {/* Wrap the table in a dedicated div */}
          <div className="csv-table-container">
            {csvData.length > 0 ? (
              <table border="1">
                <thead>
                  {/* <tr>
                    <th>Indicated Value A</th>
                    <th>Measured Value A</th>
                    <th>Coverage Factor K</th>
                    <th>Uncertainty in Measurement (%)</th>
                  </tr> */}
                </thead>
                <tbody>
                  {csvData.map((row, index) => (
                    <tr key={index}>
                      <td>{!isNaN(row.column1) ? row.column1.toFixed(2) : row.column1}</td>
                      <td>{!isNaN(row.column2) ? row.column2.toFixed(2) : row.column2}</td>
                      <td>{!isNaN(row.column3) ? row.column3.toFixed(2) : row.column3}</td>
                      <td>{!isNaN(row.column4) ? row.column4.toFixed(2) : row.column4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No CSV Data Available</p>
            )}
          </div>

          <div><br /><br /><br /></div>
        </section>
        <button className="download-button" onClick={handleDownload}>Download PDF</button>
      </div>
    </div>
  );
};

export default Result;