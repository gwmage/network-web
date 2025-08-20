```typescript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ProfileManagement from './components/ProfileManagement';
import AppInformation from './components/AppInformation';
import MatchingResults from './components/MatchingResults'; // Import MatchingResults component

const App = () => {
  const location = useLocation();
  const [showMatchingResults, setShowMatchingResults] = useState(false);

  useEffect(() => {
    // Logic to determine when to show MatchingResults.  For example, based on route:
    setShowMatchingResults(location.pathname === '/matching-results');
  }, [location]);

  return (
    <Router>
      <div> {/* Add a wrapping div */}
        <Routes>
          {/* ... other routes ... */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProfileManagement />} />
          <Route path="/application-information" element={<AppInformation />} />
          <Route path="/matching-results" element={<MatchingResults />} />
        </Routes>

        {/* Conditionally render MatchingResults with transition */}
        <div 
          className={`matching-results-container ${showMatchingResults ? 'slide-in' : 'slide-out'}`}
          style={{ transition: 'transform 0.3s ease-in-out' }} // Add transition
        >
          {showMatchingResults && <MatchingResults />}
        </div>
      </div> {/* Closing wrapping div */}
    </Router>
  );
};

export default App;

```
```css
/* Add to your global styles or a dedicated component CSS file */
.matching-results-container {
  position: fixed; /* Or absolute depending on your layout */
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px; /* Adjust as needed */
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2); /* Add shadow for visual separation */
  transform: translateX(100%); /* Initially hidden */
  z-index: 1000; /* Ensure it's above other content */
}

.matching-results-container.slide-in {
  transform: translateX(0%);
}

.matching-results-container.slide-out {
  transform: translateX(100%);
}

```