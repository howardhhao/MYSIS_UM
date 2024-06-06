import '../views-css/aboutUs.css';
import '../views-css/mainPage.css';
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarMysis from '../components/NavBarMysis';
import Footer from '../components/Footer';

function AboutUsPage() {

  const navigate = useNavigate();

  return (
    <>
    <div>
      <div className="dashboard-container">
        <NavBarMysis/>

        <div class="aboutUs1-container">
          <p className='aboutUs1-title'>Serving the Nation, Impacting the World</p>
          <div className='intro-btn-container'>
          </div>
        </div>

        <div class="aboutUs2-container">
          <p className='aboutUs2-title'>Our History</p>

          <div className='animation-container'>
            <div className="vertical-line">
              <div className='phase-1-year'>1905</div>
            </div>
            <div className='phase-1-title'>King Edward VII College of Medicine</div>
          </div>
          
          <div className='animation-container'>
            <div className="vertical-line-2"></div>
            <div className='phase-2-year'>1949</div>
            <div className='phase-2-title'>Raffles College</div>
          </div>

          <div className='animation-container'>
            <div className="vertical-line-3"></div>
            <div className='phase-3-year'>1962</div>
            <div className='phase-3-title'>University of Malaya</div>
          </div>
         


        </div>

        <div class="aboutUs3-container">
          <p className='aboutUs1-title'></p>
          <div className='intro-btn-container'>
          </div>
        </div>

        

        

        

       <Footer/>

      </div>
    </div>
    
    </>
  );
}
export default AboutUsPage;