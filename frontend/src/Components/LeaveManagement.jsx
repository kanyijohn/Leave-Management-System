import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LeaveManagement = () => {
  const [leavemanagement, setLeaveManagement] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    axios.get(`http://localhost:3000/auth/leaverequests`)
      .then(result => {
        if(result.data.Status) {
          setLeaveManagement(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this leave request?")) {
      axios.delete(`http://localhost:3000/employee/deleteleaverequests/${id}`)
        .then(result => {
          if(result.data.Status) {
            // Remove the deleted request from state
            setLeaveManagement(leavemanagement.filter(request => request.id !== id));
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Leave Requests</h2>
      <div></div>
        
      
      <table className="table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leavemanagement.map((e) => (
            <tr key={e.id}>
              <td>{e.employee_name}</td>
              <td>{e.leavetype_name}</td>
              <td>{e.start_date}</td>
              <td>{e.end_date}</td>
              <td>{e.reason}</td>
              <td>{e.status}</td>
              <td>
                <Link to={`/dashboard/approve/${e.id}`} className="btn btn-primary btn-sm me-2">
                  Approve
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveManagement;