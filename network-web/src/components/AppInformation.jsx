```typescript
import React from 'react';

const AppInformation = () => {
  return (
    <div className="app-information-container">
      {/* Title */}
      <h2>Application Information</h2>

      {/* Information Display */}
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Application ID</td>
            <td>12345</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>Pending</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default AppInformation;
```

```css
/* In your component's CSS file or within a styled-components definition */
.app-information-container {
  width: 90%; /* Occupy most of the container width */
  margin: 20px auto; /* Center the container */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

@media (max-width: 768px) { /* Adjust breakpoint as needed */
  .app-information-container {
    width: 95%; /* Increase width on smaller screens */
    padding: 15px; /* Reduce padding */
  }

  table {
    font-size: 14px; /* Reduce font size */
  }

  th, td {
    padding: 8px; /* Reduce padding */
  }
}

```
