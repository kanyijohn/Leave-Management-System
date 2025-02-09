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
          navigate('/dashboard');
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 rounded shadow-lg bg-white" style={{ width: '400px' }}>
        <div className="text-danger mb-3">
          {error && error}
        </div>
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="tick" required />
            <label className="form-check-label" htmlFor="tick">You agree with Terms & Conditions</label>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">Log in</button>
        </form>
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;