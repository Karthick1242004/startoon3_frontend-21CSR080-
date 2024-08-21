import React, { useEffect, useState } from 'react';
import Ao from './Admin.module.css';
import { Link } from 'react-router-dom';

function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://startoon3-backend-21csr080.onrender.com/admin/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={Ao.container}>
      <h1 className={Ao.head}>Admin Dashboard</h1>
      <div className={Ao.bt}>
        <button className={Ao.btn1}><Link className={Ao.lk} to='/Admin'>Table</Link></button>
        <button className={Ao.btn1}><Link className={Ao.lk} to='/Graph'>Graph</Link></button>
      </div>
      <div className={Ao.searchContainer}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className={Ao.searchInput}
        />
      </div>
      <table className={Ao.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Login Count</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.loginCount}</td>
              <td>{new Date(user.lastLogin).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
