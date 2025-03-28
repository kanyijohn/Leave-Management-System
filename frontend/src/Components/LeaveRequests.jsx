import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LeaveRequests = () => {
  const [leaverequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();
  const employee_id = localStorage.getItem('employee_id'); // Get employee ID from localStorage

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    axios.get(`http://localhost:3000/employee/leaverequests/${employee_id}`)
      .then(result => {
        if(result.data.Status) {
          setLeaveRequests(result.data.Result);
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
            setLeaveRequests(leaverequests.filter(request => request.id !== id));
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leave Applications</h2>
      <div className="mb-3 text-end">
        <Link to="/employee_dashboard/applyleave" className="btn btn-success">
          Apply Leave
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>

            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaverequests.map((e) => (
            <tr key={e.id}>
              <td>{e.leavetype_name}</td>
              <td>{e.start_date}</td>
              <td>{e.end_date}</td>
              <td>{e.reason}</td>
              <td>{e.status}</td>
              <td>
                <Link to={`/employee_dashboard/editleaverequest/${e.id}`} className="btn btn-primary btn-sm me-2">
                  Edit
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

export default LeaveRequests;