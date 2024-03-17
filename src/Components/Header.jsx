import React from 'react'
import './header.css';
import { Link } from 'react-router-dom';

const Header = ({ title, setTitle }) => {
  return (
    <div className='header'>
      <p>{title}</p>
      <Link to='/'>
        <div onClick={() => setTitle('Home')}>
          Home
        </div>
      </Link>
    </div>
  )
}

export default Header
