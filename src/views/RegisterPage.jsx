import '../views-css/forgotPassword.css';
import umLogo from '../assets/umLogo.png';
import React, { useState } from 'react';
import BottomBar from '../components/bottomBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';


function RegisterPage() {

  const navigate = useNavigate();

  const schema = Joi.object({
    password: Joi.string().min(8).required()
  });
  
  const [formData, setFormData] = useState({
    email: '',
    ic: '',
    id: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const formatIC = (inputValue) => {
    let formattedValue = inputValue.replace(/\D/g, '');
    if (formattedValue.length > 6) {
      formattedValue = formattedValue.slice(0, 6) + '-' + formattedValue.slice(6);
    }
    if (formattedValue.length > 9) {
      formattedValue = formattedValue.slice(0, 9) + '-' + formattedValue.slice(9, 13);
    }
    return formattedValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'ic' ? formatIC(value) : value;
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validateAsync({ password: formData.password }, { abortEarly: false });
      const { email, ic, id, password, role } = formData;
      const response = await axios.post('http://localhost:5050/auth/register', { email, ic, id, password, role });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      if (error.isJoi) {
        error.details.forEach(detail => {
          alert('Passwords must be exceeded 8 characters');
        });
      } else {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <>
      <div className="glass-card-reset">
        <div className="umLogo-container">
          <img className='umLogo-reset-password' src={umLogo} alt='UM Logo' />
        </div>
        <p className='title'>Welcome to UniMalaya</p>
        <p className='desc-title'>You need to activate your MYSIS UM account before login.</p>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="ic"
                name="ic"
                placeholder="IC/Passport No."
                maxLength={14}
                value={formData.ic}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Staff/Student ID"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                <option value="" disabled>Select role</option>
                <option value="Staff">Staff</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="input-group">
              <button type="submit">Continue</button>
            </div>
          </form>
        </div>
      </div>
      <BottomBar />
    </>
  );
}

export default RegisterPage;
