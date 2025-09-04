import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import './App.css'; // Import your CSS file
import RegisterForm from './components/RegisterForm.jsx'; // Import RegisterForm component
// ... other imports

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update login status based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app"> {/* Add app container */}
        <header>
        {/* Conditionally render logout button */}
        {isLoggedIn && (
            <button onClick={handleLogout}>Logout</button>
          )}
          {/* ... your header content ... */}
        </header>


        <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/"
            element={isLoggedIn ? <MainAppContent /> : <Navigate to="/login" />}
          />
          {/* ... other routes */}
          <Route path="/password-reset" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
};


function MainAppContent() {
    return (
      <div>
         {/* Content displayed when user is logged in  */}
         <h1>Welcome to the App!</h1>
         {/* Rest of your app content */}
      </div>
    );
  }

export default App;