// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = ({ onEmployeeAdded }) => {
  const [siteName, setSiteName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = { siteName, password, email };
      await axios.post('http://localhost:5000/api/employees', newEmployee);
      onEmployeeAdded();
      setSiteName('');
      setPassword('');
      setEmail('');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Employee</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="siteName" className="form-label">SiteName</label>
          <input
            type="text"
            className="form-control"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
