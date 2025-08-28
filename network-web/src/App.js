```javascript
import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ProfileManagement from './components/ProfileManagement';
import AppInformation from './components/AppInformation';
import MatchingResults from './components/MatchingResults';
import MatchingForm from './components/MatchingForm'; // Import MatchingForm
import MatchingProgress from './components/MatchingProgress'; // Import MatchingProgress
import ReservationSearch from './components/ReservationSearch';
import ReservationProcess from './components/ReservationProcess';
import ReservationConfirmation from './components/ReservationConfirmation';
import ReservationManagement from './components/ReservationManagement';
import ErrorDisplay from './components/ErrorDisplay';
import NotificationSettings from './components/NotificationSettings';
import CommunityBoard from './components/CommunityBoard';
import PostDetails from './components/PostDetails';
import SearchResults from './components/SearchResults';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [matchingResults, setMatchingResults] = useState(null);
  const [matchingInProgress, setMatchingInProgress] = useState(false);

  // ... other code

  const handleMatchingComplete = (results) => {
    setMatchingResults(results);
    setMatchingInProgress(false);
  };

  return (
    <Router>
      <Routes>
        {/* ... other routes */}
        <Route path="/matching" element={<MatchingForm />} />
        <Route
          path="/matching/progress/:groupId" // Use groupId in the route
          element={<MatchingProgress />}
        />
        <Route
          path="/matching/results"
          element={<MatchingResults results={matchingResults} />}
        />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
};

export default App;
```