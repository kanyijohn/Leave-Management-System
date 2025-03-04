import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditLeaveType = () => {
  const { id } = useParams();
  const [leavetype, setLeaveType] = useState({ name: '', duration: '', duration_type: '', is_custom: false });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/leavetype`)
      .then(result => {
        if(result.data.Status) {
          const e = result.data.Result.find(item => item.id.toString() === id);
          if(e) {
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
    axios.put(`http://localhost:3000/auth/edit_leave_type/${id}`, leavetype)
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
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" id="name" className="form-control" 
            value={leavetype.name}
            onChange={(e) => setLeaveType({ ...leavetype, name: e.target.value })}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input 
            type="text" id="duration" className="form-control" 
            value={leavetype.duration}
            onChange={(e) => setLeaveType({ ...leavetype, duration: e.target.value })}
            required 
          />
        </div>

        <div className="col-12">
            <label htmlFor="durationType" className="form-label">Duration Type</label>
            <select
              id="durationType"
              className="form-select"
              onChange={(e) =>
                setLeaveType({ ...leavetype, duration_type: e.target.value })
              }
              value={leavetype.duration_type}
              required
            >
              <option value="">Select Duration Type</option>
              <option value="working_days">Working Days</option>
              <option value="calendar_days">Calendar Days</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div className="col-12 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isCustom"
              onChange={(e) =>
                setLeaveType({ ...leavetype, is_custom: e.target.checked, duration: e.target.checked ? "" : leavetype.duration })
              }
              checked={leavetype.is_custom}
            />
            <label htmlFor="isCustom" className="form-check-label">Custom Leave</label>
          </div>

        <button type="submit" className="btn btn-primary">Update Leave Type</button>
      </form>
    </div>
  );
};

export default EditLeaveType