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
        const data = await api.getMembers();
        setMembers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteMember(id);
      setMembers(members.filter((member) => member.id !== id));
    } catch (err) {
      setError(err);
    }
  };


  if (loading) {
    return <div>Loading members...</div>;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div>
      <h2>Member Management</h2>
      {members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name} ({member.email}) 
              <button onClick={() => handleDelete(member.id)}>Delete</button>
              {/* Add Edit functionality here */}
            </li>
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