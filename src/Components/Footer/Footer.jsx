import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';


import Stingray from '../../Photos/DRedIcon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <p>Barbed</p>

      <Link to='/benPR'>
        <img className='stingIcon' src={Stingray} alt='stingray-logo' />
        {/* onClick function to a page that displays your personal record */}
      </Link>
      <p>Stingray</p>
    </div>
  )
}

export default Footer
