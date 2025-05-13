// src/pages/Reject.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reject = () => {
  const [rejectedLeaves, setRejectedLeaves] = useState([]);

  useEffect(() => {
    fetchRejectedLeaves();
  }, []);

  const fetchRejectedLeaves = () => {
    axios.get('http://localhost:3000/auth/leaverequests')
      .then((response) => {
        if (response.data.Status) {
          // Filter only rejected leaves
          const filtered = response.data.Result.filter(leave => leave.status === 'Rejected');
          setRejectedLeaves(filtered);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.error("Error fetching rejected leaves:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Rejected Leaves</h2>
      <table className="table">
        <thead className="table-light">
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
          {rejectedLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employee_name}</td>
              <td>{leave.leavetype_name}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td className="text-danger fw-bold">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reject;
