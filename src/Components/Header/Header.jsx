import React from 'react'
import { Link } from 'react-router-dom';
import { GiSpartan } from "react-icons/gi";
import './header.css';


const Header = ({ title, setTitle }) => {
  return (
    <div className='header'>

      <Link to='/'>
        <div className='homeButton' onClick={() => setTitle('Welcome')}>
          <GiSpartan />
        </div>
      </Link>

      <p>{title}</p>

    </div>
  )
}

export default Header
