import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditLeaveType = () => {
  const { id } = useParams();
  const [leaveType, setLeaveType] = useState({ name: '', duration: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/leave_types`)
      .then(result => {
        if(result.data.Status) {
          const lt = result.data.Result.find(item => item.id.toString() === id);
          if(lt) {
            setLeaveType(lt);
          } else {
            alert('Leave type not found');
          }
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/edit_leave_type/${id}`, leaveType)
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
      <h2 className="mb-4">Edit Leave Type</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Leave Type Name</label>
          <input 
            type="text" id="name" className="form-control" 
            value={leaveType.name}
            onChange={(e) => setLeaveType({ ...leaveType, name: e.target.value })}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input 
            type="text" id="duration" className="form-control" 
            value={leaveType.duration}
            onChange={(e) => setLeaveType({ ...leaveType, duration: e.target.value })}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Leave Type</button>
      </form>
    </div>
  );
};

export default EditLeaveType