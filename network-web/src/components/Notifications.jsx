import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const Notifications = () => {
  // ... (existing code)

  return (
    <div>
      <h2>Notifications <span className="unread-badge">{unreadCount > 0 && unreadCount}</span></h2>
      {loading ? (
        <div>Loading notifications...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'} ${notification.type === 'match_result' ? 'match-result' : ''}`}>
              {notification.type === 'match_result' && (
                <div>
                  <h3>Match Found!</h3>
                  <p>Number of matches: {notification.data.matchCount}</p> {/* Access matchCount from notification.data */}
                  {/* Display other relevant matching data */}
                </div>
              )}
              {/* ... other notification types ... */}
              <button onClick={() => markAsRead(notification.id)} disabled={notification.read}>Mark as Read</button>
              <button onClick={() => dismissNotification(notification.id)}>Dismiss</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;