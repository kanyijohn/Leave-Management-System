import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = () => {
    axios.get('http://localhost:3000/auth/leave_types')
      .then(result => {
        if(result.data.Status) {
          setLeaveTypes(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this leave type?")) {
      axios.delete(`http://localhost:3000/auth/delete_leave_type/${id}`)
        .then(result => {
          if(result.data.Status) {
            fetchLeaveTypes();
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
        <Link to="/dashboard/addleavetype" className="btn btn-success">
        Add Leave Type
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((lt) => (
            <tr>
              
              <td>{lt.name}</td>
              <td>{lt.duration}</td>
              <td>
                <Link to={`/dashboard/editleavetype/` + lt.id} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(lt.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveType;