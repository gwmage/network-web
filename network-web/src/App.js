```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ProfileManagement from './components/ProfileManagement';
import AppInformation from './components/AppInformation';
import MatchingResults from './components/MatchingResults';
import ReservationSearch from './components/ReservationSearch';
import ReservationProcess from './components/ReservationProcess';
import ReservationConfirmation from './components/ReservationConfirmation';
import ReservationManagement from './components/ReservationManagement';
import MatchingResultNotifications from './components/MatchingResultNotifications'; // Import the component


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMatchingResults, setShowMatchingResults] = useState(false);
  const [matchingResults, setMatchingResults] = useState(null); // Store matching results

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setShowMatchingResults(location.pathname === '/matching-results' || params.get('matching') === 'true');

    if (showMatchingResults && location.pathname !== '/matching-results') {
      const currentParams = new URLSearchParams(location.search);
      currentParams.set('matching', 'true');
      navigate(`${location.pathname}?${currentParams.toString()}`);
    }

  }, [location, navigate, showMatchingResults]);



  return (
    <Router>
      <div>
        <Routes>
          {/* ... other routes ... */}
          <Route path="/matching-results" element={<MatchingResults setMatchingResults={setMatchingResults}/>} /> {/* Pass the setter function */}
          {/* ... other routes ... */}
        </Routes>

        {/* Conditionally render MatchingResultNotifications */}
        {matchingResults && ( // Check if matchingResults data is available
          <MatchingResultNotifications matchingResults={matchingResults} />
        )}

         {/* Existing slide-in/out logic */}
        {showMatchingResults && (
          <div className={`matching-results-container ${showMatchingResults ? 'slide-in' : 'slide-out'}`} style={{ transition: 'transform 0.3s ease-in-out' }}>
            <MatchingResults setMatchingResults={setMatchingResults} /> {/* Pass the setter function here as well */}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
```