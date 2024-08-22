import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import So from './Signup.module.css';
import Image from '../../assets/DrawKit Larry Character Illustration (4).png';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../Navbar/Nav';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format!');
      return;
    }
    if (password.length <= 3) {
      toast.error('Password must be more than 3 characters!');
      return;
    }

    const user = { name, email, password };

    try {
      const response = await fetch('https://startoon3-backend-21csr080.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        toast.success('Signup successful!');
        setTimeout(() => {
          navigate('/User');
        }, 1500); 
      } else {
        const data = await response.json();
        toast.error(data.error || 'Signup failed!');
      }
    } catch (error) {
      toast.error('Error during signup.');
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Nav/>
      <div className={So.main}>
        <img className={So.img} src={Image} alt="img" />
        <div className={So.form}>
          <h1 className={So.head}>Signup Here</h1>
          <div className={So.form1}>
            <label className={So.lable}>Name : </label>
            <input
              className={So.inp}
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={So.form1}>
            <label className={So.lable}>Email : </label>
            <input
              className={So.inp}
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={So.form1}>
            <label className={So.lable}>Password : </label>
            <input
              className={So.inp}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className={So.acc}>Already have an account? <Link to='/Login'> Login</Link></p>
          <button className={So.btn} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
