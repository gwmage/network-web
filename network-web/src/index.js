import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Check if window is defined (meaning we're in a browser environment)
if (typeof window !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
