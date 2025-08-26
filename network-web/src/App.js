```typescript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MatchingForm from './components/MatchingForm';
import MatchingProgress from './components/MatchingProgress';
import MatchingResults from './components/MatchingResults';
import Filters from './components/Filters';
import Applications from './components/Applications';
import RestaurantDetails from './components/RestaurantDetails'; // Import the RestaurantDetails component

const App = () => {
  // ... existing code ...

  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/restaurant/:id" element={<RestaurantDetails />} /> {/* Add the route for RestaurantDetails */}
        <Route path="/applications" element={<Applications />} /> 
      </Routes>
    </Router>
  );
};

export default App;
```