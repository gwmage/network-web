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
import NotificationSettings from './components/NotificationSettings';
import CommunityBoard from './components/CommunityBoard'; // Import the CommunityBoard component
import axios from 'axios';

const App = () => {
  // ... existing code ...

  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/notifications" element={<NotificationSettings />} />
        <Route path="/community" element={<CommunityBoard />} /> {/* Add the route for CommunityBoard */}
      </Routes>
    </Router>
  );
};

export default App;

```