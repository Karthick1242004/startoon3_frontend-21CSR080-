import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lo from './Login.module.css';
import Image from '../../assets/DrawKit Larry Character Illustration (4).png';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../Navbar/Nav';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (name.trim() === '') {
      toast.error('Name is required!');
      return;
    }
  
    if (password.length <= 3) {
      toast.error('Password must be more than 3 characters!');
      return;
    }
  
    const user = { name, password };
  
    try {
      const response = await fetch('https://startoon3-backend-21csr080.onrender.com/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (response.ok) {
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/User', { state: { name: user.name } }); 
        }, 1500); 
      } else {
        const data = await response.json();
        toast.error(data.error || 'Login failed!');
      }
    } catch (error) {
      toast.error('Error during login.');
      console.error('Error:', error);
    }
  };
  
  

  return (
    <>
    <Nav/>
      <div className={Lo.main}>
        <img className={Lo.img} src={Image} alt="img" />
        <div className={Lo.form}>
          <h1 className={Lo.head}>Login Here</h1>
          <div className={Lo.form1}>
            <label className={Lo.lable}>Name : </label>
            <input
              className={Lo.inp}
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={Lo.form1}>
            <label className={Lo.lable}>Password : </label>
            <input
              className={Lo.inp}
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className={Lo.acc}>Don't have an account? <Link to='/Signup'> Signup</Link></p>
          <button className={Lo.btn} onClick={handleSubmit}>Submit</button>
          <div className={Lo.pp}>
            <p>Demo User Name : karthick</p>
            <p>Demo User Password : karthick</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
