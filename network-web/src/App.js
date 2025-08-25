```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
    setIsAdminLoggedIn(!!adminToken);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AdminProtectedRoute = ({ children }) => {
    if (!isAdminLoggedIn) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/app-information" element={<AppInformation />} />
        <Route path="/matching" element={<MatchingResults />} />
        <Route path="/reservation/search" element={<ReservationSearch />} />
        <Route path="/reservation/process" element={<ReservationProcess />} />
        <Route path="/reservation/confirm" element={<ReservationConfirmation />} />
        <Route path="/reservation/manage" element={<ReservationManagement />} /> {/* Added */}
        <Route path="/community" element={<CommunityBoard />} />
        <Route path="/community/:postId" element={<PostDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path="/notifications" element={<NotificationSettings />} />
        <Route path="/error" element={<ErrorDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;
```