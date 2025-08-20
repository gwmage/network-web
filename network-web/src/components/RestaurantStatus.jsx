```typescript
import React from 'react';

const RestaurantStatus = ({ connected }) => {
  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  );
};

export default RestaurantStatus;
```