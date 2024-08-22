import React from 'react';
import Na from './Nav.module.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className={Na.main}>
      <div>
        <h1 className={Na.h1}>Startoon Labs</h1>
      </div>
      <div > 
        <button><Link className={Na.bbt} to='/Adminlogin'>Admin</Link></button>
      </div>
    </div>
  )
}

export default Nav
