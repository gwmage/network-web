```
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminNavigation from './components/AdminNavigation';
import AdminMatching from './components/AdminMatching';
import AdminMatchingProgress from './components/AdminMatchingProgress';
import AdminUsers from './components/AdminUsers';
import AdminSettings from './components/AdminSettings';
import AdminPermissions from './components/AdminPermissions';

function App() {
  return (
    <Router>
        <div>
            <AdminNavigation />
            <Routes>
              <Route path="/admin/matching" element={<AdminMatching />} />
              <Route path="/admin/matching/progress" element={<AdminMatchingProgress />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/permissions" element={<AdminPermissions />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;

```