```typescript
import React from 'react';

type ErrorDisplayProps = {
  error: string | null | unknown;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  let errorMessage = 'An unexpected error occurred. Please try again later.';
  let errorDetails = null;

  if (error && typeof error === 'object' && 'response' in error && error.response && error.response.data) {
    if (error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    if (error.response.status) {
      errorDetails = `Status Code: ${error.response.status}`;
    }
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = error.message;
  }

  return (
    <div style={{ color: 'red' }}>
      <p>{errorMessage}</p>
      {errorDetails && <p>{errorDetails}</p>}
    </div>
  );
};

export default ErrorDisplay;

```