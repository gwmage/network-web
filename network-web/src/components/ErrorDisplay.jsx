```typescript
import React from 'react';

type ErrorDisplayProps = {
  error: string | null;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <p style={{ color: 'red' }}>{error}</p>;
};

export default ErrorDisplay;
```