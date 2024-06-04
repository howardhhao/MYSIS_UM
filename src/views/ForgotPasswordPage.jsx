import '../views-css/forgotPassword.css';
import umLogo from '../assets/umLogo.png';
import React from 'react';
import BottomBar from '../components/bottomBar';


function ForgotPasswordPage() {

  return (
    <><div className="glass-card-reset">

      <div className="umLogo-container">
        <img className='umLogo-reset-password' src={umLogo} alt='UM Logo' />
      </div>

      <p className='title'>Reset Password</p>
      <p className='desc-title'>To initiate the password reset process, please enter your IC Number along with either your Staff ID or Student ID in the provided fields. Upon submission, an email will be sent to your registered alternate email address with further instructions on how to reset your password.</p>

      <div className='form-container'>
        <form>
          <div className="input-group">
            <input
              type="text"
              id="ic"
              name="ic"
              placeholder="IC/Passport No."
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
export default ForgotPasswordPage;