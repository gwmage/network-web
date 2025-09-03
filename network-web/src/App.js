```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import MatchingForm from './components/MatchingForm'; // Import MatchingForm

// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        {/* ... other routes */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/matching" element={<MatchingForm />} /> {/* Add route for MatchingForm */}
      </Routes>
    </Router>
  );
}

export default App;

```