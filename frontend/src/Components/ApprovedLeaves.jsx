import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApprovedLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // ✅ Fetch all pending leave requests
  const fetchLeaveRequests = () => {
    axios.get('http://localhost:3000/auth/leaverequests') // Fixed API endpoint
      .then(response => {
        if (response.data.Status) {
          setLeaveRequests(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch(error => console.error("Error fetching leave requests:", error));
  };

  // ✅ Approve Leave
  const approveLeave = (id) => {
    if (window.confirm("Are you sure you want to approve this leave request?")) {
      axios.put(`http://localhost:3000/auth/approvedleaves/${id}`) // Corrected API call
        .then(response => {
          if (response.data.Status) {
            alert("Leave request approved successfully!");
            fetchLeaveRequests(); // Refresh list after approval
          } else {
            alert(response.data.Error);
          }
        })
        .catch(error => console.error("Error approving leave:", error));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Approve Leave Requests</h2>
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
              <td className={leave.status === "Approved" ? "text-success" : "text-warning"}>
                {leave.status}
              </td>
              <td>
                {leave.status !== "Approved" && (
                  <button className="btn btn-success btn-sm" onClick={() => approveLeave(leave.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedLeaves;
