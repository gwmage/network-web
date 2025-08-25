```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserEdit from './UserEdit';

const AdminMembers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/users'); // Use API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Implement appropriate error handling, e.g., display error message
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
      // Implement appropriate error handling
    }
  };

  const handleCloseEdit = () => {
    setSelectedUser(null);
    setIsEditing(false);
    // Refresh user list after editing
    axios.get('/admin/users').then(response => setUsers(response.data));
    
  };


  return (
    <div>
      <h2>Member Management</h2>
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
      {isEditing && (
        <UserEdit user={selectedUser} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default AdminMembers;

```