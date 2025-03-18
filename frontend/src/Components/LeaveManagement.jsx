import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveManagement = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [leaverequests, setLeaveRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Fetch pending leave requests
  const fetchPendingLeaves = () => {
    axios.get('http://localhost:3000/auth/leaverequests')
      .then(res => {
        if(res.data.Status) {
          setPendingLeaves(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  // Fetch leave history for all employees
  const fetchLeaveHistory = () => {
    axios.get('http://localhost:3000/auth/leaverequests')
      .then(res => {
        if(res.data.Status) {
          setLeaveRequests(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  // Simulated polling for notifications every 10 seconds
  const fetchNotifications = () => {
    axios.get('http://localhost:3000/auth/notifications')
      .then(res => {
        if(res.data.Status) {
          setNotifications(res.data.Result);
        }
      })
      .catch(err => console.log(err));
  };

  // Approve a leave request
  const handleApprove = (id) => {
    axios.put(`http://localhost:3000/admin/leaverequest/${id}/approve`)
      .then(res => {
        if(res.data.Status) {
          fetchPendingLeaves();
          fetchLeaveRequests();
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  // Reject a leave request
  const handleReject = (id) => {
    axios.put(`http://localhost:3000/auth/leaverequest/${id}/reject`)
      .then(res => {
        if(res.data.Status) {
          fetchPendingLeaves();
          fetchLeaveHistory();
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPendingLeaves();
    fetchLeaveHistory();
    fetchNotifications();
    // Poll for notifications every 10 seconds
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Leave Management</h2>
      
      {/* Notifications Section */}
      <div className="mb-4">
        <h4>Notifications</h4>
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <ul className="list-group">
            {notifications.map((note) => (
              <li key={note.id} className="list-group-item">
                {note.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pending Leave Requests */}
      <div className="mb-4">
        <h4>Pending Leave Requests</h4>
        {pendingLeaves.length === 0 ? (
          <p>No pending leave requests.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.employee_name}</td>
                  <td>{leave.leavetype_name}</td>
                  <td>{leave.start_date}</td>
                  <td>{leave.end_date}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(leave.id)}>
                      Approve
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleReject(leave.id)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Leave History */}
      <div className="mb-4">
        <h4>Leave History</h4>
        {leaveHistory.length === 0 ? (
          <p>No leave records available.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((record) => (
                <tr key={record.id}>
                  <td>{record.employee_name}</td>
                  <td>{record.leavetype_name}</td>
                  <td>{record.start_date}</td>
                  <td>{record.end_date}</td>
                  <td>{record.reason}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;