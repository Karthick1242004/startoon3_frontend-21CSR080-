import React from 'react';
import { useLocation } from 'react-router-dom';
import Ue from './User.module.css';

function User() {
  const location = useLocation();
  const { name } = location.state || { name: 'User' }; 
  return (
    <div className={Ue.main}>
      <h1 className={Ue.h1}>Thank You for Signing Up with us, {name}!</h1>
    </div>
  );
}

export default User;
