// Notification.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchNotifications(); // initial fetch
    const interval = setInterval(fetchNotifications, 1800000); // 30 mins = 1800000ms
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = () => {
    axios.get('http://localhost:3000/auth/leaverequests')
      .then((response) => {
        if (response.data.Status) {
          setNotifications(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
      });
  };

  return (
    <div className="position-relative">
      <button
        className="btn btn-outline-secondary"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🔔 Notifications
        {notifications.length > 0 && (
          <span className="badge bg-danger ms-2">{notifications.length}</span>
        )}
      </button>

      {showDropdown && (
        <div className="dropdown-menu dropdown-menu-end show mt-2 p-2 shadow-sm" style={{ minWidth: '300px' }}>
          <h6 className="dropdown-header">Recent Leave Applications</h6>
          {notifications.length === 0 ? (
            <span className="dropdown-item text-muted">No new leave requests.</span>
          ) : (
            notifications.map((notif, index) => (
              <div key={index} className="dropdown-item">
                <strong>{notif.employee_name}</strong> applied for <strong>{notif.leavetype_name}</strong> leave
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
