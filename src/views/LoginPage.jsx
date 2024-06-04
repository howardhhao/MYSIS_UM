import '../views-css/login.css';
import umLogo from '../assets/umLogo.png';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../components/bottomBar';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleSignIn = async (event) => {
      event.preventDefault();
      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
      } else {
        try {
          const response = await axios.post('http://localhost:5050/login', { username, password, role });
          console.log(response.data);
          navigate('./main');
        } catch (error) {
          console.error('Login failed:', error.response?.data || error.message);
          alert('Login credentials incorrect');
        }
      }
    };

  return (
    <><div className="glass-card">
      <div className="umLogo-container">
        <img className='umLogo' src={umLogo} alt='UM Logo' />
      </div>

      <h2>Please Enter Your UMMail (staff) / Siswa Mail (student) username</h2>

      <div className='form-container'>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required />
          </div>

          <div className="input-group">
            <select id="role" name="role" value={role} onChange={handleRoleChange} required>
              <option value="" disabled>Select role</option>
              <option value="staff">Staff</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <a className="forgot-password" href="/forgotPassword">Forgot password?</a>
          </div>

          <div className="input-group">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
    <BottomBar/>
    </>
  );
}
export default LoginPage;
