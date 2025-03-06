import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const [applyleave, setApplyLeave] = useState({ 
    leavetype_id: '', 
    start_date: '',
    end_date: '', 
    reason: ''
  });
  const [leavetype, setLeaveType] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch leave types from the backend
    axios.get('http://localhost:3000/auth/leavetype')
      .then(result => {
        if (result.data.Status) {
          setLeaveType(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/applyleave', applyleave)
      .then(result => {
        if (result.data.Status) {
          navigate('/employee_dashboard/applyleave');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Apply Leave</h3>
        <form className="row g-3" onSubmit={handleSubmit}>

          {/* Leave Type */}
          <div className="col-12">
            <label htmlFor="leavetype" className="form-label">
              Leave Type
            </label>
            <select
              name="leavetype"
              id="leavetype"
              className="form-select"
              onChange={(e) =>
                setApplyLeave({ ...applyleave, leavetype_id: e.target.value })
              }
              value={applyleave.leavetype_id}
              required
            >
              <option value="">Select Leave</option>
              {leavetype.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="col-12">
            <label htmlFor="startDate" className="form-label">From</label>
            <input
              type="date"
              className="form-control rounded-0"
              id="startDate"
              placeholder="Enter Start Date"
              onChange={(e) =>
                setApplyLeave({ ...applyleave, start_date: e.target.value })
              }
              value={applyleave.start_date}
              required
            />
          </div>

          {/* End Date */}
          <div className="col-12">
            <label htmlFor="endDate" className="form-label">To</label>
            <input
              type="date"
              className="form-control rounded-0"
              id="endDate"
              placeholder="Enter End Date"
              onChange={(e) =>
                setApplyLeave({ ...applyleave, end_date: e.target.value })
              }
              value={applyleave.end_date}
              required
            />
          </div>

          {/* Reason */}
          <div className="col-12">
            <label htmlFor="reason" className="form-label">Reason</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="reason"
              placeholder="Description"
              onChange={(e) =>
                setApplyLeave({ ...applyleave, reason: e.target.value })
              }
              value={applyleave.reason}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100 rounded mb-2">
              Apply Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;