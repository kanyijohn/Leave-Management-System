import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LeaveType = () => {
  const [leavetype, setLeaveType] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaveType();
  }, []);

  const fetchLeaveType = () => {
    axios.get('http://localhost:3000/auth/leavetype')
      .then(result => {
        if(result.data.Status) {
          setLeaveType(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this leave type?")) {
      axios.delete(`http://localhost:3000/auth/delete_leavetype/${id}`)
        .then(result => {
          if(result.data.Status) {
            fetchLeaveType();
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Leave Types</h2>
      <div className="mb-3 text-end">
        <Link to="/dashboard/add_leavetype" className="btn btn-success">
        Add Leave Type
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Duration</th>
            <th>Duration Type</th>
            <th>Custom Leave</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leavetype.map((e) => (
            <tr>
              
              <td>{e.name}</td>
              <td>{e.duration}</td>
              <td>{e.duration_type}</td>
              <td>{e.is_custom ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/dashboard/edit_leavetype/` + e.id} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveType;