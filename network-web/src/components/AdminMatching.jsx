```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingError, setMatchingError] = useState(null);

  const triggerMatching = async () => {
    try {
      const response = await axios.post('/matching');
      setMatchingStatus(response.data);
      setMatchingError(null);
    } catch (error) {
      setMatchingStatus(null);
      setMatchingError(error.message);
    }
  };

  useEffect(() => {
    const fetchMatchingStatus = async () => {
      try {
        const response = await axios.get('/matching/status');
        setMatchingStatus(response.data);
        setMatchingError(null);
      } catch (error) {
        setMatchingStatus(null);
        setMatchingError(error.message);
      }
    };

    fetchMatchingStatus();
  }, []);


  return (
    <div>
      <h2>Matching Management</h2>
      <button onClick={triggerMatching}>Trigger Matching</button>
      {matchingStatus && (
        <div>
          <h3>Matching Status:</h3>
          <pre>{JSON.stringify(matchingStatus, null, 2)}</pre>
        </div>
      )}
      {matchingError && (
        <div>
          <h3>Error:</h3>
          <p>{matchingError}</p>
        </div>
      )}
    </div>
  );
};

export default AdminMatching;

```