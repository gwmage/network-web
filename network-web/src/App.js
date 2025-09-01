```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import MatchingForm from './components/MatchingForm';
import MatchingProgress from './components/MatchingProgress';
import MatchingResults from './components/MatchingResults';
import Filters from './components/Filters';
import Applications from './components/Applications';
import RestaurantDetails from './components/RestaurantDetails';
import ProfileManagement from './components/ProfileManagement';
import NotificationSettings from './components/NotificationSettings';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  const [matchingGroupId, setMatchingGroupId] = useState(null);


  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/matching" element={<MatchingForm setMatchingGroupId={setMatchingGroupId} />} />
        <Route path="/matching/progress" element={<MatchingProgress groupId={matchingGroupId} />} />
        <Route path="/matching/results" element={<MatchingResults groupId={matchingGroupId} />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/notification-settings" element={<NotificationSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
```