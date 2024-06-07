import React , { useState } from 'react';
import '../views-css/mainPage.css';
import { Icon } from '@iconify/react';
import roundMenu from '@iconify/icons-ic/round-menu';
import MenuModal from './MenuModal';
import MenuFeaturesBar from './MenuFeaturesBar';
import umLogo from '../assets/umLogo.png';

function NavBarMysis() {

const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogOut = () => {
      window.location.href = '/'
  };

  const handleLogoClick = () => {
    window.location.href = '/main';
  };

  const handleMenuDropDown = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
   <div className="nav-bar">
          <img className='umLogo-nav-bar' src={umLogo} alt='UM Logo' onClick={handleLogoClick} />
          {/* <p>Username <span>Name</span></p> */}
          <Icon className='icon-notification' icon="ph:notification-light" />
          <Icon className='icon-menu' onClick={handleMenuDropDown} icon={roundMenu}/>
          <MenuModal isOpen={isModalOpen} onClose={handleMenuDropDown}>
          <MenuFeaturesBar/>
          </MenuModal>
          <button className='log-out-button' onClick={handleLogOut}>Log Out</button>
        </div>
    </>
  );
}
export default NavBarMysis;
