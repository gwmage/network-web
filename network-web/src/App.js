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
import axios from 'axios';

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

    // Check for matching and send notification if applicable
    if (showMatchingResults) {
      const sendMatchNotification = async () => {
        try {
          const response = await axios.post('/api/matching/notifications', { deliveryMethod: 'push' });
          console.log(response.data); // Log the response for debugging

          // Placeholder push notification function
          sendPushNotification('Match found!'); 
        } catch (error) {
          console.error("Failed to send notification:", error);
        }
      };

      sendMatchNotification();
    }
  }, [location, navigate, showMatchingResults]);

  const sendPushNotification = (message) => {
    // Replace this with your actual push notification logic
    console.log("Sending push notification:", message);
  };


  return (
    // ... rest of the component
  );
};

export default App;
```