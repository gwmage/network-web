```javascript
import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import MatchingForm from './components/MatchingForm';
import MatchingProgress from './components/MatchingProgress';
import MatchingResults from './components/MatchingResults';
import Filters from './components/Filters';
import Applications from './components/Applications';
import RestaurantDetails from './components/RestaurantDetails';
import ProfileManagement from './components/ProfileManagement';
import NotificationSettings from './components/NotificationSettings';
import ReservationProcess from './components/ReservationProcess'; // Import ReservationProcess

// Create context for global state
const AppContext = createContext();

// Define reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INPUT':
      return { ...state, userInput: action.payload };
    case 'SET_MATCHING_RESULTS':
      return { ...state, matchingResults: action.payload };
    case 'SET_MATCHING_PROGRESS':
      return { ...state, matchingProgress: action.payload };
    case 'SET_API_ERROR':
      return { ...state, apiError: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const initialState = {
    userInput: null,
    matchingResults: null,
    matchingProgress: 0,
    apiError: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          <Route path="/" element={<MatchingForm />} />
          <Route path="/matching-progress" element={<MatchingProgress />} />
          <Route path="/matching-results" element={<MatchingResults />} />
          <Route path="/filters" element={<Filters />} /> {/* Example route */}
          <Route path="/reservation" element={<ReservationProcess />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/profile" element={<ProfileManagement />} />
          <Route path="/notification-settings" element={<NotificationSettings />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
export { AppContext };
```