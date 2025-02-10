import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import adminIcon from '../assets/admin-icon.png'; // Update with the correct path to your admin icon

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) { 
          localStorage.removeItem("valid");
          navigate('/');
        }
      });
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="dashboard">
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <img src={adminIcon} alt="Admin Icon" className="rounded-circle me-2" width="30" height="30" />
              <span className={`fs-5 fw-bolder d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>
                Admin
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className={`ms-2 d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className={`ms-2 d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>Manage Employees</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/department"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-building ms-2"></i>
                  <span className={`ms-2 d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>Department</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className={`ms-2 d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/leavetype"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar ms-2"></i>
                  <span className={`ms-2 d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>Leave Type</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/leavemanagement"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar-check ms-2"></i>
                  <span className={`ms-2 d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>Leave Management</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className={`ms-2 d-none d-sm-inline ${isCollapsed ? 'd-none' : ''}`}>Logout</span>
                </Link>
              </li>
            </ul>
            <button className="btn btn-outline-light mt-3" onClick={toggleSidebar}>
              {isCollapsed ? <i className="bi bi-arrow-right-square"></i> : <i className="bi bi-arrow-left-square"></i>}
            </button>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-between align-items-center shadow bg-light">
            <h3 className="nav title"><strong>Employee Leave Management</strong></h3>
            <div>
              <button className="btn btn-outline-dark me-2">Notifications</button>
              <button className="btn btn-outline-dark">Settings</button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;