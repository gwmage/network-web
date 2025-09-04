import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { sendPushNotification } from '../utils/pushNotifications'; // Import push notification function


const MatchingResults = () => {
  // ... existing code

  useEffect(() => {
    // ... existing code for fetching matching results

    // After fetching results (in the .then block or after await):
    if (results && results.length > 0) {
      const userId = 1; // Replace with actual user ID retrieval from authentication

      // Update backend with new notification
      // Example using a hypothetical 'createNotification' API function:
       api.createNotification(userId, {
         type: 'match_result',
         message: `You have ${results.length} new matches!`,
         data: { matchCount: results.length } // Include relevant match data 
       })
       .then(() => {
         // If you have real-time updates or want to trigger an immediate re-render of the notifications component, consider using a context or state management solution.
       })
       .catch(error => {
         console.error("Error creating notification:", error);
       });

      // Trigger push notification
      sendPushNotification({
        title: 'Match Found!',
        body: `You have ${results.length} new matches!`,
        data: { matchCount: results.length, userId },
      });

    }
  }, []);

  // ... rest of the component code
};


export default MatchingResults;