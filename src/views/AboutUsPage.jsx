import '../views-css/aboutUs.css';
import '../views-css/mainPage.css';
import React from 'react';
import NavBarMysis from '../components/NavBarMysis';
import Footer from '../components/Footer';

function AboutUsPage() {
  // implement pagination

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

       <Footer/>

      </div>
    </div>
    
    </>
  );
}
export default AboutUsPage;