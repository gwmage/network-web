```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/users">User Management</Link>
          </li>
          <li>
            <Link to="/admin/matching">Matching Management</Link>
          </li>
          <li>
            <Link to="/admin/settings">System Settings</Link>
          </li>
          <li>
            <Link to="/admin/permissions">Permission Management</Link>
          </li>
        </ul>
      </nav>
      {/* Outlet for rendering child components */}
      <div className="admin-content">
        {/* React Router Outlet will be placed here */}
      </div>
    </div>
  );
};

export default AdminDashboard;

```