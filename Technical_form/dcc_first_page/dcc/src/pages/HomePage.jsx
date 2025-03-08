import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/homePage.css'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="wraper">
      <div className="heading_n_img">
        <img src="https://www.nplindia.org/wp-content/uploads/2023/01/CSIR-removebg-preview-150x150.png" alt="CSIR Logo" />
        <h1>CSIR-NPL</h1>
        <img src="https://www.nplindia.org/wp-content/uploads/2021/12/npl-150x150.png" alt="NPL Logo" />
      </div>

      <div className="middle-section">
        <img src="https://candela-ptb.de/wp-content/uploads/2021/01/NPL2.jpg" alt="NPL Image" />
        <div className="btns">

          <button className="technical" role="button" onClick={() => navigate('/technical-signup')}>
            <span className="text">Technical</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;