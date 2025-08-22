```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import ErrorDisplay from './ErrorDisplay';

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await api.getMembers(); // Assuming an API function to fetch members
        setMembers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div>Loading members...</div>;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div>
      <h2>Member Management</h2>
      {/* Display members here */}
      {members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <li key={member.id}>{member.name}</li> // Assuming 'id' and 'name' properties
          ))}
        </ul>
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
};

export default AdminMembers;

```