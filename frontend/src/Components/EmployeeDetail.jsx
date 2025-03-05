import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      }).catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Employee Profile</h4>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img src={employee.profile_picture || 'https://via.placeholder.com/150'} alt="Profile" className="img-fluid rounded-circle mb-3" />
              <h5>{employee.name}</h5>
              <p className="text-muted">{employee.position}</p>
            </div>
            <div className="col-md-8">
              <h5 className="mb-3">Personal Details</h5>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Email:</strong></div>
                <div className="col-sm-8">{employee.email}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Phone:</strong></div>
                <div className="col-sm-8">{employee.phone}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Department:</strong></div>
                <div className="col-sm-8">{employee.department_name}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Position:</strong></div>
                <div className="col-sm-8">{employee.position}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Address:</strong></div>
                <div className="col-sm-8">{employee.address}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Date of Birth:</strong></div>
                <div className="col-sm-8">{employee.date_of_birth}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Date of Joining:</strong></div>
                <div className="col-sm-8">{employee.date_of_joining}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Emergency Contact:</strong></div>
                <div className="col-sm-8">{employee.emergency_contact}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Blood Group:</strong></div>
                <div className="col-sm-8">{employee.blood_group}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4"><strong>Nationality:</strong></div>
                <div className="col-sm-8">{employee.nationality}</div>
              </div>
              <div className="text-end mt-4">
                <button className="btn btn-primary me-2">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;