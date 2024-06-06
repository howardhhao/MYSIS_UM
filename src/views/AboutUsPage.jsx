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
          <p className='aboutUs1-title'></p>
          <div className='intro-btn-container'>
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