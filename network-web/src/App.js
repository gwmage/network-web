```javascript
import React, { useState, useEffect, useReducer } from 'react';
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
import CommunityBoard from './components/CommunityBoard';
import PostDetails from './components/PostDetails';
import SearchResults from './components/SearchResults';
import SearchBar from './components/SearchBar'; // Import SearchBar component
import axios from 'axios';
import Main from './components/Main';
import SignUp from './components/SignUp'; // Import SignUp component
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  // ... other code

  return (
    <Router>
      <Routes>
        {/* ... other routes */}
        <Route path="/register" element={<SignUp />} /> {/* Registration page route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/community" element={<><SearchBar onSearch={handleSearch} /><CommunityBoard /></>} />
        <Route path="/community/search" element={<SearchResults searchResults={searchResults} />} />
        <Route path="/community/:postId" element={<PostDetails />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
};

export default App;
```