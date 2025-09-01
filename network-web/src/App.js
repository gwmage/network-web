```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import LoginForm from './components/LoginForm'; // Import LoginForm

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<LoginForm />} /> {/* Add the login route */}
      </Routes>
    </Router>
  );
};

export default App;
```