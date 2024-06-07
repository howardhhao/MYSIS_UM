import '../views-css/forgotPassword.css';
import umLogo from '../assets/umLogo.png';
import React , { useState } from 'react';
import BottomBar from '../components/bottomBar';


function RegisterPage() {

    const [value, setValue] = useState('');

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
    const inputValue = e.target.value;
    const formattedValue = formatIC(inputValue);
    setValue(formattedValue);
  };

  return (
    <><div className="glass-card-reset">

      <div className="umLogo-container">
        <img className='umLogo-reset-password' src={umLogo} alt='UM Logo' />
      </div>

      <p className='title'>Welcome to UniMalaya</p>
      <p className='desc-title'>You need to activate your MYSIS UM account before login.</p>

      <div className='form-container'>
        <form>
            <div className="input-group">
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required />
            </div>
            
          <div className="input-group">
            <input
              type="text"
              id="ic"
              name="ic"
              placeholder="IC/Passport No."
              maxLength= {14}
              required />
          </div>

          <div className="input-group">
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Staff/Student ID"
              required />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required />
          </div>

          <div className="input-group">
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Confirm Password"
              required />
          </div>

          <div className="input-group">
            <select id="role" name="role" required>
              <option value="" disabled selected>Select role</option>
              <option value="admin">Staff</option>
              <option value="user">Student</option>
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