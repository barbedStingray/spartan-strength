import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';


const LandingPage = ({ title, setTitle }) => {

  function setTitleHeader() {
    console.log('setting Header');
  }

  // pathways for navigation component
  const titles = [
    'Welcome',

  ];


  return (
    <div className='landingPage'>

      <Link to='/stopwatch'>
        <div onClick={() => setTitle('StopWatch')}>
          Stopwatch
        </div>
      </Link>

      <Link to='/spartacus'>
        <div onClick={() => setTitle('Classic Workout')}>
          Spartacus Workout
        </div>
      </Link>

      <Link to='/custom'>
        <div onClick={() => setTitle('Custom Workout')}>
          Custom Workout
        </div>
      </Link>


    </div>
  )
}






export default LandingPage
