```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserEdit from './UserEdit';
import './AdminMembers.css'; // Import CSS file

const AdminMembers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseEdit = () => {
    setSelectedUser(null);
    setIsEditing(false);
    axios.get('/admin/users').then(response => setUsers(response.data));
  };

  return (
    <div className="admin-members-container">
      <h2>Member Management</h2>
      <div className="table-responsive"> {/* Add a responsive wrapper */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <UserEdit user={selectedUser} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default AdminMembers;

```

```css
/* network-web/src/components/AdminMembers.css */
.admin-members-container {
  padding: 20px;
}

.table-responsive {
  overflow-x: auto; /* Enable horizontal scrolling if table is too wide */
}

/* Basic responsive table styling */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

@media (max-width: 768px) { /* Adjust breakpoint as needed */
  table, thead, tbody, th, td, tr {
    display: block; /* Stack table elements vertically */
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px; /* Hide table header */
  }

  tr { border: 1px solid #ccc; }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%; /* Indent cell content */
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap; /* Prevent header text from wrapping */
    content: attr(data-label); /* Display header text as pseudo-element */
    font-weight: bold;
  }
}

```