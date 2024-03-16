import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {



  return (
    <div>
      <h1>Landing Page</h1>

      <Link to='/stopwatch'>Stopwatch</Link>
      <Link to='/spartacus'>Classic Spartacus</Link>

      
    </div>
  )
}






export default LandingPage
