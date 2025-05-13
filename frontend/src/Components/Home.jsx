import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    totalLeaves: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    axios.get('http://localhost:3000/auth/dashboard')
      .then((response) => {
        if (response.data.Status) {
          setDashboardData(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row">
        {/* Total Employees */}
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total Employees</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.totalEmployees}</h5>
            </div>
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Pending Leave Requests</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.pendingLeaves}</h5>
            </div>
          </div>
        </div>

        {/* Approved Leaves */}
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Approved Leaves</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.approvedLeaves}</h5>
            </div>
          </div>
        </div>

        {/* Rejected Leaves */}
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Rejected Leaves</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.rejectedLeaves}</h5>
            </div>
          </div>
        </div>

        {/* Total Leave Applications */}
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Total Leave Applications</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.totalLeaves}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;