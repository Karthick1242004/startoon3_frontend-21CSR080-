import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Ad from './Adminlogin.module.css'; 
import Image from '../../assets/DrawKit Larry Character Illustration (4).png';
import Nav from '../Navbar/Nav';

function Adminlogin() {
  const [name, setName] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://startoon3-backend-21csr080.onrender.com/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message); 
        navigate(data.redirectTo); 
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something went wrong, please try again later.'); 
    }
  };

  return (
    <>
    <Nav/>
      <div className={Ad.main}>
        <img className={Ad.img} src={Image} alt="img" />
        <div className={Ad.form}>
          <h1 className={Ad.head}>Admin Login Here</h1>
          <div className={Ad.form1}>
            <label className={Ad.label}>Name: </label>
            <input
              className={Ad.inp}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={Ad.form1}>
            <label className={Ad.label}>Password: </label>
            <input
              className={Ad.inp}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className={Ad.acc}>
            Are you a user? <Link to="/Login">Login</Link>
          </p>
          <button className={Ad.btn} onClick={handleSubmit}>Submit</button>
          <div className={Ad.pp}>
            <p>Demo Admin Name: admin@email.com</p>
            <p>Demo Admin Password: Admin@123</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Adminlogin;
