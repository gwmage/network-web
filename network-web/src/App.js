```typescript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MatchingForm from './components/MatchingForm';
import MatchingProgress from './components/MatchingProgress';
import MatchingResults from './components/MatchingResults';
import Filters from './components/Filters';

const App = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({ category: '', tags: [] }); // Store filter criteria
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
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(`/matching/groups?category=${filterCriteria.category}&tags=${filterCriteria.tags.join(',')}`); // Include filter criteria in API call
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMatchingResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    // Fetch results whenever filterCriteria changes
    fetchResults();
  }, [filterCriteria]);


  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchingForm onSubmit={handleFormSubmit} />} />
        <Route path="/matching/progress" element={<MatchingProgress status={matchingStatus} />} />
        <Route path="/matching/results" element={
          <>
            <Filters onFilterChange={handleFilterChange} /> {/* Include Filters component */}
            <MatchingResults results={matchingResults} fetchResults={fetchResults} />
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;

```