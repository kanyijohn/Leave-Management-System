import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reject = () => {
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRejectedLeaves();
  }, []);

  const fetchRejectedLeaves = () => {
    axios.get('http://localhost:3000/auth/leaverequests')
      .then((response) => {
        if (response.data.Status) {
          const filtered = response.data.Result.filter(leave => leave.status === 'Rejected');
          setRejectedLeaves(filtered);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.error("Error fetching rejected leaves:", error));
  };

  // Filter based on search input
  const filteredLeaves = rejectedLeaves.filter((leave) =>
    leave.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.leavetype_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.start_date.includes(searchQuery) ||
    leave.end_date.includes(searchQuery)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Rejected Leave Requests</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by employee name, leave type, or date..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className="table table-bordered">
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
                <td className="text-danger fw-bold">{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">No rejected leave records match your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reject;
