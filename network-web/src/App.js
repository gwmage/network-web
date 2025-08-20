```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ProfileManagement from './components/ProfileManagement'; // Import the component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProfileManagement />} /> {/* Add the route for ProfileManagement */}
      </Routes>
    </Router>
  );
};

export default App;
```