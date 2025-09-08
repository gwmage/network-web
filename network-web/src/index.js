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

  // Example of how to properly log an object. Replace this with your actual object.
  const exampleObject = { message: 'Hello, world!', data: { someValue: 123 } };
  console.log(JSON.stringify(exampleObject, null, 2)); // Stringify the object before logging
}
