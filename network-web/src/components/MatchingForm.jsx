```jsx
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import MatchingProgress from './MatchingProgress';
import MatchingResults from './MatchingResults'; // Import MatchingResults

const MatchingForm = () => {
  // ... (existing code)

  const [matchingResults, setMatchingResults] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setMatchingInProgress(true);
    setMatchingError(null);
    setMatchingResults(null); // Clear previous results

    try {
      const userResponse = await api.createUser(formData);
      console.log('User created:', userResponse.data);

      const matchingResponse = await api.triggerMatching(formData); // Pass formData to triggerMatching
      console.log('Matching triggered:', matchingResponse.data);


      if (matchingResponse.data && matchingResponse.data.length > 0) {
          setMatchingResults(matchingResponse.data);
        } else {
          console.warn("Matching results are empty or null. This might be expected if the matching is asynchronous.");
      }



    } catch (error) {
      console.error("Error creating user or triggering matching:", error);
      setMatchingError(error.message);
    } finally {
      setMatchingInProgress(false);
    }
  };

  return (
    <div>
      {/* ... (existing form code) */}

      {matchingInProgress && <MatchingProgress />}
      {matchingError && <div>Error: {matchingError}</div>}
      {matchingResults && <MatchingResults results={matchingResults} />} {/* Display results */}
    </div>
  );
};

export default MatchingForm;

```