import React from 'react';
import './footer.css';

import Stingray from '../../Photos/DRedIcon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <p>Barbed</p>
      <img className='stingIcon' src={Stingray} alt='stingray-logo' />
      {/* onClick function to a page that displays your personal record */}
      <p>Stingray</p>
    </div>
  )
}

export default Footer
