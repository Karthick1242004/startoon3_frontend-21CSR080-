import React, { useEffect, useState } from 'react';
import Ao from './Admin.module.css';
import { Link } from 'react-router-dom';

function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://startoon3-backend-21csr080.onrender.com/admin/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <div className={Ao.container}>Loading...</div>;
  }

  if (error) {
    return <div className={Ao.container}>Error: {error}</div>;
  }

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
      <div className={Ao.tableContainer}>
        <table className={Ao.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Login Count</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.loginCount}</td>
                  <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
