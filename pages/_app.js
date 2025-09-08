import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/index.css';
import { useEffect } from 'react';

const theme = createTheme();

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if window object exists (client-side)
      window.addEventListener('error', (event) => {
        // Capture and log JavaScript errors with detailed information
        console.error('Client-side error:', event.message, event.filename, event.lineno, event.colno);
        if (event.error) {
          console.error('Error Object:', event.error.message, event.error.stack);
        }
        // Log specific event properties instead of the entire event object. Stringify objects for better logging.
        console.error('Event Details:', JSON.stringify({
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          errorStack: event.error?.stack, // Safely access error.stack
        }, null, 2)); // Use JSON.stringify for proper formatting in logs
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
