import '../views-css/mainPage.css';
import umLogo from '../assets/umLogo.png';
import React from 'react';

function MainPage() {

    const handleLogOut = () => {
        window.location.href = '/'
      };


  return (
    <>
    <div className="dashboard-container">
      <div className="nav-bar">
        <img className='umLogo-nav-bar' src={umLogo} alt='UM Logo' />
        <button className='log-out-button' onClick={handleLogOut}>Log Out</button>
      </div>

      <div class="intro-container">
        <p className='intro-title'>Check your co-curricular activities</p>
        <div className='intro-btn-container'>
        <button className='btn-about-us'>About Us</button>
        <button className='btn-helpdesk'>Helpdesk</button>
        </div>
      </div>

      <div class="horizontal-scroll-container">
        <div class="content-item">Profile</div>
        <div class="content-item">CTES</div>
        <div class="content-item">Hostel</div>
        <div class="content-item">Activities</div>
        <div class="content-item">Sticker</div>
        <div class="content-item">Smartcard</div>
        <div class="content-item">Award</div>
        <div class="content-item">MyCPP</div>
        <div class="content-item">MyCPP</div>
        <div class="content-item">Finance</div>
      </div>

      <div class="announcement-container">
        <p className='announcement-title'>Announcement</p>
        <div class="horizontal-scroll-announcement-container">
        <div class="announcement-content-item"></div>
        <div class="announcement-content-item"></div>
        <div class="announcement-content-item"></div>
        <div class="announcement-content-item"></div>
        <div class="announcement-content-item"></div>
        <div class="announcement-content-item"></div>
        <div class="announcement-content-item"></div>
        <div class="announcement-content-item"></div>
      </div>

      <footer class="site-footer">
        <div class="copyright">
          <p>&copy; Innovated by Wong Wen Hao. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
    </div>
    </>
  );
}
export default MainPage;