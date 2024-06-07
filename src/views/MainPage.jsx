import '../views-css/mainPage.css';
import React from 'react';
import FeaturesBar from '../components/FeaturesBar';
import Navbar from '../components/NavBarMysis';
import Footer from '../components/Footer';

function MainPage() {

  const handleClickAboutUs = () => {
    window.location.href = '/aboutUs';
  };

  const handleClick = () => {
    window.location.href = 'https://helpdesk.um.edu.my/';
  };

  return (
    <>
    <div>
      <div className="dashboard-container">

        <Navbar/>

        <div class="intro-container">
          <p className='intro-title'>Check your co-curricular activities</p>
          <div className='intro-btn-container'>
            <button className='btn-about-us' onClick={handleClickAboutUs}>About Us</button>
            <button className='btn-helpdesk' onClick={handleClick}>Helpdesk</button>
          </div>
        </div>

        <FeaturesBar/>

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

        <Footer/>


      </div>
      </div>
    </div>
    
    </>
  );
}
export default MainPage;