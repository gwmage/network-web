```typescript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MatchingForm from './components/MatchingForm';
import MatchingProgress from './components/MatchingProgress';
import MatchingResults from './components/MatchingResults';


const App = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch('/matching/status');
      const data = await response.json();
      setMatchingStatus(data);
    };

    fetchStatus();

    const intervalId = setInterval(fetchStatus, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFormSubmit = async (formData) => {
    // Send formData to backend to initiate matching
    try {
      const response = await fetch('/matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/matching/progress');


    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., display an error message
    }
  };



  const fetchResults = async () => {
    const response = await fetch('/matching/groups');
    const data = await response.json();
    setMatchingResults(data);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchingForm onSubmit={handleFormSubmit} />} />
        <Route path="/matching/progress" element={<MatchingProgress status={matchingStatus} />} />
        <Route path="/matching/results" element={<MatchingResults results={matchingResults} fetchResults={fetchResults} />} />
      </Routes>
    </Router>
  );
};

export default App;

```