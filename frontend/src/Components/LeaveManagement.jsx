import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    axios.get('http://localhost:3000/auth/leaverequests')
      .then(response => {
        if (response.data.Status) {
          setLeaveRequests(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch(error => console.error("Error fetching leave requests:", error));
  };

  const approveLeave = (id) => {
    axios.put(`http://localhost:3000/auth/approvedleaves/${id}`)
      .then(response => {
        if (response.data.Status) {
          alert("Leave request approved successfully!");
          fetchLeaveRequests();
        } else {
          alert(response.data.Error);
        }
      })
      .catch(error => console.error("Error approving leave:", error));
  };

  const deleteLeaveRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      axios.delete(`http://localhost:3000/employee/deleteleaverequests/${id}`)
        .then(response => {
          if (response.data.Status) {
            alert("Leave request deleted successfully!");
            setLeaveRequests(leaveRequests.filter(request => request.id !== id));
          } else {
            alert(response.data.Error);
          }
        })
        .catch(error => console.error("Error deleting leave request:", error));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Leave Requests</h2>

      {/* Button to navigate to Approve.jsx (Approved Leaves Page) */}
      <button className="btn btn-success mb-3" onClick={() => navigate('/dashboard/approve')}>
        View Approved Leaves
      </button>

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
          {leaveRequests.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employee_name}</td>
              <td>{leave.leavetype_name}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td className={leave.status === "Approved" ? "text-success fw-bold" : "text-warning"}>
                {leave.status}
              </td>
              <td>
                {leave.status !== "Approved" && (
                  <button className="btn btn-primary btn-sm me-2" onClick={() => approveLeave(leave.id)}>
                    Approve
                  </button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => deleteLeaveRequest(leave.id)}>
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
