import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          localStorage.setItem('valid', true);
          navigate('/dashboard');
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow-lg bg-white" style={{ width: '470px' }}>
        <div className="text-danger mb-3">
          {error && error}
        </div>
        <h1 className="text-center mb-4">Login</h1>
        <p className="text-center mb-4">Welcome Admin</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            
            <input 
              type="email"
              name="email"
              autoComplete="off"
              placeholder="📧Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded"
              required
            />
          </div>
          <div className="mb-3">
            
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="🔒Password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control rounded"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded mb-2">Login</button>
        </form>
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">Forgot Password?</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;