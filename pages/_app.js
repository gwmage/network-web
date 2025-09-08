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
        // Log specific event properties instead of the entire object
        console.error('Event Details:', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          errorStack: event.error?.stack, // Safely access error.stack
        });
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
