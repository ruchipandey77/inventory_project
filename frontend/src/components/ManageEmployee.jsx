import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ siteName: '', password: '', email: '' });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordVerified, setPasswordVerified] = useState(false);

  const SUPERADMIN_PASSWORD = '123'; // Change this to your desired password

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    (employee.siteName?.toLowerCase() ||"").includes(searchTerm.toLowerCase()) ||
    (employee.password?.toLowerCase() ||"").includes(searchTerm.toLowerCase()) ||
    (employee.email?.toLowerCase()||"").includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!passwordVerified) {
      alert('Please verify the password to delete employees.');
      return;
    }
  
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    if (passwordVerified) {
      setEditingEmployee(employee._id);
      setFormData({ siteName: employee.siteName, password: employee.password, email: employee.email });
    } else {
      alert('Please verify the password to edit employees.');
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === SUPERADMIN_PASSWORD) {
      setPasswordVerified(true);
      alert('Password verified! You can now edit employees.');
    } else {
      alert('Incorrect password. Access denied.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${editingEmployee}`, formData);
      setEditingEmployee(null);
      setFormData({ siteName: '', password: '', email: '' });
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h3>Manage Employees</h3>

      {!passwordVerified && (
        <div className="mb-3">
          <h5>Enter Password for Edit Access</h5>
          <input
            type="password"
            className="form-control"
            placeholder="Enter superadmin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={handlePasswordSubmit}
          >
            Verify Password
          </button>
        </div>
      )}




      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by siteName,  or email"
        value={searchTerm}
        onChange={handleSearch}
      />

      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>siteName</th>
            <th>Password</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.siteName}</td>
              <td>{employee.password}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h4>Edit Employee</h4>
          <div className="mb-3">
            <label htmlFor="siteName" className="form-label">siteName</label>
            <input
              type="text"
              className="form-control"
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Employee</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingEmployee(null);
              setFormData({ siteName: '', password: '', email: '' });
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageEmployee;
