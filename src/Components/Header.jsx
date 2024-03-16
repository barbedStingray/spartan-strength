import React from 'react'
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <p>This is the Header</p>
        <Link to='/'>HOME</Link>
    </div>
  )
}

export default Header
