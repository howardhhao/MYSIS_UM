import '../views-css/forgotPassword.css';
import umLogo from '../assets/umLogo.png';
import React, { useState } from 'react';
import axios from 'axios';
import BottomBar from '../components/bottomBar';

function ForgotPasswordPage() {

  const [ic, setIC] = useState('');
  const [id, setID] = useState('');
  const [role, setRole] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

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

  const handleICChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatIC(inputValue);
    setIC(formattedValue);
  };

  const handleIDChange = (e) => {
    setID(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/auth/verifyUser', { id, ic, role });
      console.log(response);
      if (response.data.success) {
        setShowPasswordModal(true);
      } else {
        console.log ('Verification failed. Please check your details and try again.');
      }
    } catch (error) {
      console.log('An error occurred. Please try again later.');
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/auth/updatePassword', { ic, newPassword });
      console.log(response);
      if (response.data.success) {
        setShowPasswordModal(false);
      } else {
        console.log('Failed to update password. Please try again.');
      }
    } catch (error) {
      console.log('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="glass-card-reset">
      <div className="umLogo-container">
        <img className='umLogo-reset-password' src={umLogo} alt='UM Logo' />
      </div>
      <p className='title'>Reset Password</p>
      <p className='desc-title'>
        To initiate the password reset process, please enter your IC Number along with either your Staff ID or Student ID in the provided fields. Upon successful verification, you will be able to reset your password.
      </p>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="ic"
              name="ic"
              placeholder="IC/Passport No."
              maxLength={14}
              value={ic}
              onChange={handleICChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Staff/Student ID"
              value={id}
              onChange={handleIDChange}
              required
            />
          </div>
          <div className="input-group">
            <select id="role" name="role" value={role} onChange={handleRoleChange} required>
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
      {showPasswordModal && (
        <div className="password-modal">
          <div className="modal-content">
            <h2>Enter New Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <button onClick={handlePasswordSubmit}>Confirm</button>
            <button onClick={() => setShowPasswordModal(false)}>Cancel</button>
          </div>
        </div>
      )}
     
    </div>
  );
}

export default ForgotPasswordPage;
