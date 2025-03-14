import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const employee_id = localStorage.getItem('employee_id'); // Get employee ID from localStorage

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${employee_id}`)
      .then(result => {
        if(result.data.Status) {
          // Expecting Result to be an array with a single employee object
          setEmployee(result.data.Result[0]);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [employee_id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if(result.data.Status) {
          localStorage.removeItem("employee_id");
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Employee Profile</h4>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
        <div className="card-body">
          <h5>Name: {employee.name}</h5>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Department:</strong> {employee.department_name}</p>
          {/* Additional profile details can be added here */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;