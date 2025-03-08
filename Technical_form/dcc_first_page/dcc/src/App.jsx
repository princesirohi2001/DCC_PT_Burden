import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import SignUpForm from './components/TechnicalSignin';
import TechnicalCalibrationForm from './components/TechnicalCalibrationForm';
import Result from './components/Result';


function App() {




  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technical-signup" element={<SignUpForm />} /> 

        <Route path="/technical-calibration-form" element={<TechnicalCalibrationForm />} />



        <Route path="/result" element={<Result />} />
        {/* Add routes for Form and Generate Certificate pages here if needed */}
      </Routes>
    </Router>
  );
}


export default App;
