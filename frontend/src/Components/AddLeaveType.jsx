import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeaveType = () => {
  const [leaveType, setLeaveType] = useState({ name: '', duration: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_leave_type', leaveType)
      .then(result => {
        if(result.data.Status) {
          navigate('/dashboard/leavetype');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Leave Type</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Leave Type Name</label>
          <input 
            type="text" id="name" className="form-control" 
            placeholder="e.g. Annual Leave" 
            value={leaveType.name}
            onChange={(e) => setLeaveType({ ...leaveType, name: e.target.value })} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input 
            type="text" id="duration" className="form-control" 
            placeholder="e.g. 30 working days per year" 
            value={leaveType.duration}
            onChange={(e) => setLeaveType({ ...leaveType, duration: e.target.value })}
            required 
          />
        </div>
        <button type="submit" className="btn btn-success">Add Leave Type</button>
      </form>
    </div>
  );
};

export default AddLeaveType;