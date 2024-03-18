import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

import LandingLink from '../../Components/LandingLink';



const LandingPage = ({ title, setTitle }) => {

  function setTitleHeader() {
    console.log('setting Header');
  }

  // pathways for navigation component
  const titles = [
    { path: '/stopwatch', name: 'StopWatch' },
    { path: '/spartacus', name: 'Spartacus' },
    { path: '/custom', name: 'Custom' }
  ];


  return (
    <div className='landingPage'>

      <div className='landingLinks'>
        {titles.map((item) => (
          <LandingLink setTitle={setTitle} path={item.path} name={item.name} />
        ))}
      </div>

    </div>
  )
}






export default LandingPage
