"import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavigation.css';

const AdminNavigation = () => {
  return (
    <nav className=\"admin-navigation\">
      <ul>
        <li>
          <Link to=\"/admin/users\">User Management</Link>
        </li>
        <li>
          <Link to=\"/admin/matching\">Matching Management</Link>
        </li>
        <li>
          <Link to=\"/admin/settings\">System Settings</Link>
        </li>
        <li>
          <Link to=\"/admin/permissions\">Permission Management</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;"