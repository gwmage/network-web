import React, { useEffect } from 'react';
import reportWebVitals from './reportWebVitals';

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      reportWebVitals();
    }
  }, []);

  return (
    <div>
      {/* Your App content here */}
    </div>
  );
}
