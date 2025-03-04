import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeaveType = () => {
  const [leavetype, setLeaveType] = useState({ 
    name: '', 
    duration: '',
    duration_type: '', 
    is_custom: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_leavetype', leavetype)
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
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Leave Type</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Leave Name */}
          <div className="col-12">
            <label htmlFor="leaveName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="leaveName"
              placeholder="Enter Leave Name"
              onChange={(e) =>
                setLeaveType({ ...leavetype, name: e.target.value })
              }
              value={leavetype.name}
              required
            />
          </div>

          {/* Duration */}
          <div className="col-12">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input
              type="number"
              className="form-control rounded-0"
              id="duration"
              placeholder="Enter Duration (in days)"
              onChange={(e) =>
                setLeaveType({ ...leavetype, duration: e.target.value })
              }
              value={leavetype.duration}
              disabled={leavetype.is_custom} // Disable if custom leave is selected
              required={!leavetype.is_custom}
            />
          </div>

          {/* Duration Type */}
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

          {/* Is Custom Checkbox */}
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

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100 rounded mb-2">
              Add Leave Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveType;