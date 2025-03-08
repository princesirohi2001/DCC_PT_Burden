import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css';
import axios from 'axios';

const SignUpForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const endpoint = isLogin
        ? 'http://localhost:5000/login'
        : 'http://localhost:5000/register';

      const response = await axios.post(endpoint, {
        email,
        password,
        ...(isLogin ? {} : { confirmPassword: formData.confirmPassword })
      });

      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
      console.log(response.data);

      if (isLogin) {
        navigate('/technical-calibration-form'); // Navigate to Admin Dashboard after login
      } else {
        setIsLogin(true); // Switch to login form after signup
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || 'Something went wrong.');
      } else {
        alert('Failed to connect to the server.');
      }
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" onClick={toggleForm} className="toggle-button">
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
