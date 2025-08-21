```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavigation.css';

const AdminNavigation = () => {
  return (
    <nav className="admin-navigation">
      <ul>
        <li>
          <Link to="/admin/members">회원 관리</Link>
        </li>
        <li>
          <Link to="/admin/matching">매칭 관리</Link>
        </li>
        <li>
          <Link to="/admin/settings">시스템 설정</Link>
        </li>
        <li>
          <Link to="/admin/permissions">권한 관리</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
```