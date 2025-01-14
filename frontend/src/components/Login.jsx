// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css'; // Import CSS file

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', { email, password });
//       if (response.data.success) {
//         navigate('/dashboard');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//       <p>Don't have an account? <a href="/signup">Sign up</a></p>
//     </div>
//   );
// };

// export default Login;


// 




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logins from '../css/Login.module.css'; // Import CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [siteName, setSiteName] = useState(''); 
  const [role, setRole] = useState(''); // Initially no role selected
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (role === 'superadmin') {
        // Superadmin login validation with fixed credentials
        if (email !== 'superadmin@domain.com' || password !== '123') {
          alert('Invalid Superadmin credentials');
          return;
        }
        navigate('/dashboard'); // Navigate to Superadmin dashboard
      } else if (role === 'admin') {
        // Admin login with API request
        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
          role,
          siteName
        });

        const data =  response.data;

        if (data.success) {

          localStorage.setItem('token', data.token); // Store token for future requests
          localStorage.setItem('siteName', data.user.siteName); // Store siteName


          navigate('/dashboard/orders/add',{
            state: { siteName: data.user.siteName },   
          }); // Navigate to add orders page
        } else {
          alert(data.message);
        }
      } else {
        alert('Please select a role to continue');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className={`body ${logins.bgimage}`}>
      <div className={`container ${logins.bgblue}`}>
        <h2>Login</h2>

        {/* Role Selection */}
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Choose Role</label>
          <select
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {/* Conditional Rendering of Form */}
        {role && (
          <form onSubmit={handleLogin}>
            {/* Email */}
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

            {/* Site Name - Only for Admin */}
            {role === 'admin' && (
              <div className="mb-3">
                <label htmlFor="siteName" className="form-label">Site Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        )}

        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
