```typescript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import MatchingForm from './components/MatchingForm';
import MatchingProgress from './components/MatchingProgress';
import MatchingResults from './components/MatchingResults';
import Filters from './components/Filters';
import Applications from './components/Applications';
import RestaurantDetails from './components/RestaurantDetails';
import ProfileManagement from './components/ProfileManagement'; // Import ProfileManagement
import NotificationSettings from './components/NotificationSettings'; // Import NotificationSettings

const App = () => {
  // ... existing code ...

  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<ProfileManagement />} /> {/* Add the route for ProfileManagement */}
        <Route path="/notification-settings" element={<NotificationSettings />} /> {/* Add the route for Notification Settings */}
      </Routes>
    </Router>
  );
};

export default App;
```