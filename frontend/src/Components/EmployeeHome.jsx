import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeHome = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const employee_id = localStorage.getItem('employee_id'); // Get employee ID from localStorage

  useEffect(() => {
    fetchLeaveRequests();
  }, [employee_id]);

  const fetchLeaveRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/employee/leaverequests/${employee_id}`);
      if (res.data.Status) {
        setLeaveRequests(res.data.Result);
      } else {
        console.error(res.data.Error);
      }
    } catch (err) {
      console.error(err);
    }
  };


  // Calculate counts based on status (ensure your statuses match these values)
  const pending = leaveRequests.filter(r => r.status.toLowerCase() === 'pending').length;
  const approved = leaveRequests.filter(r => r.status.toLowerCase() === 'approved').length;
  const rejected = leaveRequests.filter(r => r.status.toLowerCase() === 'rejected').length;

  // Remove loading state once both requests finish (this sample uses a fixed delay)
  useEffect(() => {
    // You can also set loading to false after each call finishes or combine results as needed.
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [leaveRequests]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Dashboard</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-white bg-warning mb-3">
                <div className="card-header">Pending Requests</div>
                <div className="card-body">
                  <h5 className="card-title">{pending}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">Approved Requests</div>
                <div className="card-body">
                  <h5 className="card-title">{approved}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-danger mb-3">
                <div className="card-header">Rejected Requests</div>
                <div className="card-body">
                  <h5 className="card-title">{rejected}</h5>
                </div>
              </div>
            </div>
          </div>


          {/* Quick Links */}
          <div className="d-flex justify-content-around">
            <Link to="/employee_dashboard/applyleave" className="btn btn-primary">
              Apply for Leave
            </Link>
            <Link to="/employee_dashboard/leaverequests" className="btn btn-secondary">
              View Leave Requests
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeHome;