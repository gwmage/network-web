```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ProfileManagement from './components/ProfileManagement';
import AppInformation from './components/AppInformation'; // Import AppInformation component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/application-information" element={<AppInformation />} />
      </Routes>
    </Router>
  );
};

export default App;

```