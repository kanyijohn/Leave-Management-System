import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditLeaveRequest = () => {
  const { id } = useParams(); // leave request id
  const [leaverequests, setLeaveRequests] = useState({
    leavetype_id: "",
    start_date: "",
    end_date: "",
    reason: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the leave request details by its id
    axios.get('http://localhost:3000/employee/leaverequests/' + id)
      .then(result => {
        if(result.data.Status) {
          const req = result.data.Result[0];
          setLeaveRequests({
            leavetype_id: req.leavetype_id,
            start_date: req.start_date,
            end_date: req.end_date,
            reason: req.reason
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/employee/editleaverequest/' + id, leaverequests)
      .then(result => {
        if(result.data.Status) {
          navigate('/employee_dashboard/leaverequests');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this leave request?")) {
      axios.delete('http://localhost:3000/employee/deleteleaverequests/' + id)
        .then(result => {
          if(result.data.Status) {
            navigate('/employee_dashboard/leaverequests');
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Leave Request</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="leavetype" className="form-label">
              Leave Type ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="leavetype"
              placeholder="Enter Leave Type ID"
              value={leaverequests.leavetype_id}
              onChange={(e) =>
                setLeaveRequests({ ...leaverequests, leavetype_id: e.target.value})
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="start_date" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="start_date"
              value={leaverequests.start_date}
              onChange={(e) =>
                setLeaveRequests({ ...leaverequests, start_date: e.target.value})
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="end_date" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="end_date"
              value={leaverequests.end_date}
              onChange={(e) =>
                setLeaveRequests({ ...leaverequests, end_date: e.target.value})
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="reason" className="form-label">
              Reason
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="reason"
              placeholder="Enter Reason"
              value={leaverequests.reason}
              onChange={(e) =>
                setLeaveRequests({ ...leaverequests, reason: e.target.value})
              }
            />
          </div>
          <div className="col-12 mt-2 d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeaveRequest;