"import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPassword from './components/ForgotPassword';
import MatchingManagement from './components/MatchingManagement';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to=\"/login\" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path=\"/login\" element={<LoginForm />} />
        <Route path=\"/register\" element={<RegisterForm />} />
        <Route path=\"/password-reset\" element={<ForgotPassword />} />
        <Route
          path=\""
          element={
            <ProtectedRoute>
              {/* Your main app content here */}
              <h1>Welcome to the Network</h1>
            </ProtectedRoute>
          }
        />
        <Route path=\"/admin/matching\" element={<MatchingManagement />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;"