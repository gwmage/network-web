```typescript
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <a href="/admin/users">User Management</a>
          </li>
          <li>
            <a href="/admin/matching">Matching Management</a>
          </li>
          <li>
            <a href="/admin/settings">System Settings</a>
          </li>
        </ul>
      </nav>
      {/* Other sections of the dashboard can be added here */}
    </div>
  );
};

export default AdminDashboard;
```