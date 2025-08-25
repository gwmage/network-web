```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ProfileManagement from './components/ProfileManagement';
import AppInformation from './components/AppInformation';
import MatchingResults from './components/MatchingResults';
import MatchingForm from './components/MatchingForm';
import MatchingProgress from './components/MatchingProgress';
import ReservationSearch from './components/ReservationSearch';
import ReservationProcess from './components/ReservationProcess';
import ReservationConfirmation from './components/ReservationConfirmation';
import ReservationManagement from './components/ReservationManagement';
import ErrorDisplay from './components/ErrorDisplay';
import NotificationSettings from './components/NotificationSettings';
import CommunityBoard from './components/CommunityBoard';
import PostDetails from './components/PostDetails';
import SearchResults from './components/SearchResults';
import axios from 'axios';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  // ... existing code

  return (
    <Router>
      <Routes>
        {/* ... other routes */}
        <Route path="/matching" element={<MatchingForm />} />
        <Route path="/matching/progress" element={<MatchingProgress />} />
        <Route path="/matching/results" element={<MatchingResults />} />
        <Route path="/community" element={<CommunityBoard />} />
        <Route path="/community/search" element={<SearchResults />} />
        <Route path="/community/:postId" element={<PostDetails />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
};

export default App;
```