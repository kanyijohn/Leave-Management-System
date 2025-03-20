import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Approve = () => {
  const [approvedLeaves, setApprovedLeaves] = useState([]);

  useEffect(() => {
    fetchApprovedLeaves();
  }, []);

  // ✅ Fetch approved leave requests
  const fetchApprovedLeaves = () => {
    axios.get('http://localhost:3000/auth/approve') // Fixed API endpoint
      .then(result => {
        if (result.data.Status) {
          setApprovedLeaves(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Approved Leaves</h2>

      <table className="table">
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
          {approvedLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employee_name}</td>
              <td>{leave.leavetype_name}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td className="text-success fw-bold">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approve;