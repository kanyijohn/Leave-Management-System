import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Approve = () => {
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApprovedLeaves();
  }, []);

  const fetchApprovedLeaves = () => {
    axios.get('http://localhost:3000/auth/leaverequests')
      .then((response) => {
        if (response.data.Status) {
          const filtered = response.data.Result.filter(leave => leave.status === 'Approved');
          setApprovedLeaves(filtered);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.error("Error fetching approved leaves:", error));
  };

  // Filtered search logic
  const filteredLeaves = approvedLeaves.filter((leave) =>
    leave.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.leavetype_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.start_date.includes(searchQuery) ||
    leave.end_date.includes(searchQuery)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Approved Leave Requests</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by employee name, leave type, or date..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

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
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employee_name}</td>
                <td>{leave.leavetype_name}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td className="text-success fw-bold">{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">No approved leave records match your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Approve;
