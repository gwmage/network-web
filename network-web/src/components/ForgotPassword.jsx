```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/auth/password-recovery', { // Update with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setIsError(false);
         // Optionally redirect or show a different view after successful submission
         setTimeout(() => {
           navigate('/login');
        }, 3000); // Redirect after 3 seconds

      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
        setIsError(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred during password reset.');
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reset Password</button>
      {message && (
        <p className={isError ? 'error-message' : 'success-message'}>{message}</p>
      )}
    </form>
  );
};

export default ForgotPassword;

```