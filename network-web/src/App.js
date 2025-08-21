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
import CommunityBoard from './components/CommunityBoard';
import PostDetails from './components/PostDetails';
import axios from 'axios';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminMembers from './components/AdminMembers'; // Placeholder component
import AdminMatching from './components/AdminMatching'; // Placeholder component
import AdminSettings from './components/AdminSettings'; // Placeholder component
import AdminPermissions from './components/AdminPermissions'; // Placeholder component
import AdminDashboard from './components/AdminDashboard';
import AdminNavigation from './components/AdminNavigation';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  // ... existing code ...

  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/community" element={<CommunityBoard />} />
        <Route path="/community/:postId" element={<PostDetails />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route path="members" element={<AdminMembers />} />
          <Route path="matching" element={<AdminMatching />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="permissions" element={<AdminPermissions />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;

```