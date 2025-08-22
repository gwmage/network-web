```typescript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../utils/api';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    // ... other user fields
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(parseInt(id as string, 10));
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error, e.g., redirect to error page
      }
    };

    fetchUser();
  }, [id]);


  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(parseInt(id as string, 10), user);
      navigate('/users'); // Redirect to user list after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        {/* Add other input fields for user properties */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserEdit;
```