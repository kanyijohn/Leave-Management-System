import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Approve = () => {
  const [approve, Approve] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    fetchApprove();
  }, []);

  const fetchApprove = () => {
    axios.get(`http://localhost:3000/auth/approve`)
      .then(result => {
        if(result.data.Status) {
          setApprove(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Approved Leaves</h2>
      <div></div>
        
      
      <table className="table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th >Status</th>
            
          </tr>
        </thead>

        <tbody>
          {approve.map((e) => (
            <tr key={e.id}>
              <td>{e.employee_name}</td>
              <td>{e.leavetype_name}</td>
              <td>{e.start_date}</td>
              <td>{e.end_date}</td>
              <td>{e.reason}</td>
              <td className="btn btn-primary btn-sm me-2">{e.status}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approve;