import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();

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

  const rejectLeave = (id) => {
    if (window.confirm("Are you sure you want to reject this leave request?")) {
      axios.put(`http://localhost:3000/auth/rejectleaves/${id}`)
        .then(response => {
          if (response.data.Status) {
            alert("Leave request rejected successfully!");
            fetchLeaveRequests();
          } else {
            alert(response.data.Error);
          }
        })
        .catch(error => console.error("Error rejecting leave:", error));
    }
  };

  const deleteLeaveRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      axios.delete(`http://localhost:3000/employee/deleteleaverequests/${id}`)
        .then(response => {
          if (response.data.Status) {
            alert("Leave request deleted.");
            setLeaveRequests(leaveRequests.filter(leave => leave.id !== id));
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

     {/* ✅ Navigation Buttons */}
<div className="mb-3 d-flex gap-3">
  <button className="btn btn-success" onClick={() => navigate('/dashboard/approve')}>
    View Approved Leaves
  </button>
  <button className="btn btn-danger" onClick={() => navigate('/dashboard/reject')}>
    View Rejected Leaves
  </button>
</div>


      <table className="table">
        <thead className="table-light">
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
              <td
                className={
                  leave.status === "Approved"
                    ? "text-success fw-bold"
                    : leave.status === "Rejected"
                    ? "text-danger fw-bold"
                    : "text-warning"
                }
              >
                {leave.status}
              </td>
              <td>
                {leave.status === "Pending" && (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => approveLeave(leave.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => rejectLeave(leave.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteLeaveRequest(leave.id)}
                >
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
