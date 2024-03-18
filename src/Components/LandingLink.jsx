import React from 'react';
import { Link } from 'react-router-dom';


const LandingLink = ({ setTitle, path, name }) => {
  return (
    <Link to={path}>
      <div className='landLink' onClick={() => setTitle(name)}>
        <p>{name}</p>
      </div>
    </Link>
  )
}

export default LandingLink
