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
import ErrorDisplay from './components/ErrorDisplay';


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMatchingResults, setShowMatchingResults] = useState(false);

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProfileManagement />} />
          <Route path="/application-information" element={<AppInformation />} />
          <Route path="/matching-results" element={<MatchingResults />} />
          <Route path="/reservation-search" element={<ReservationSearch />} />
          <Route path="/reservation-process" element={<ReservationProcess />} />
          <Route path="/reservation-confirmation" element={<ReservationConfirmation />} />
          <Route path="/reservation-management" element={<ReservationManagement />} />
          <Route path="*" element={
             <React.Fragment>
             {/* Your existing content for other routes goes here */}
            {showMatchingResults && (
              <div className={`matching-results-container ${showMatchingResults ? 'slide-in' : 'slide-out'}`}
                   style={{ transition: 'transform 0.3s ease-in-out' }}>
                <MatchingResults/>
              </div>
            )}
            </React.Fragment>

           } />
        </Routes>


      </div>
    </Router>
  );
};

export default App;
```