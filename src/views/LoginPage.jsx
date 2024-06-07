import '../views-css/login.css';
import umLogo from '../assets/umLogo.png';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../components/bottomBar';

function LoginPage() {
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        const id = e.target.elements.id.value;
        const password = e.target.elements.password.value;
        const role = e.target.elements.role.value;

        try {
            const response = await axios.post('http://localhost:5050/auth/login', { id, password, role });
            console.log('Login successful:', response.data);
            navigate('./main');
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Incorrect login credentials');
        }
    };

    return (
        <>
            <div className="glass-card">
                <div className="umLogo-container">
                    <img className='umLogo' src={umLogo} alt='UM Logo' />
                </div>

                <h2>Please Enter Your UMMail (staff) / Siswa Mail (student) username</h2>

                <div className='form-container'>
                    <form onSubmit={handleSignIn}>
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
                            <select id="role" name="role" required>
                                <option value="" disabled>Select role</option>
                                <option value="Staff">Staff</option>
                                <option value="Student">Student</option>
                            </select>
                        </div>

                        <div>
                            <a className="forgot-password" href="/forgotPassword">Forgot password?</a>
                            <a className="first-time-login" href="/register">First time login?</a>
                        </div>

                        <div className="input-group">
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
            <BottomBar />
        </>
    );
}

export default LoginPage;
