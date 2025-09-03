import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPassword from './components/ForgotPassword';
import MatchingManagement from './components/MatchingManagement';
import NotificationSettings from './components/NotificationSettings';
import MatchingResults from './components/MatchingResults'; // Import MatchingResults

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ... other routes */}
        <Route path="/settings" element={<NotificationSettings />} />
        <Route path="/matching/results" element={<MatchingResults />} /> {/* Add route for MatchingResults */}
      </Routes>
    </Router>
  );
};

export default App;