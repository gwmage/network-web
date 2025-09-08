import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/index.css';

const theme = createTheme();

export default function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    // Check if window object exists (client-side)
    window.addEventListener('error', (event) => {
      // Capture and log JavaScript errors with detailed information
      console.error('Client-side error:', event.message, event.filename, event.lineno, event.colno);

      // Correctly log the error object using a custom serializer to handle circular structures
      function serializeError(error) {
        const serializedError = {};
        for (const key in error) {
          if (error.hasOwnProperty(key)) {
            serializedError[key] = error[key];
          }
        }
        return JSON.stringify(serializedError, null, 2); // Use null, 2 for pretty printing if needed
      }
      console.error('Error Object:', serializeError(event.error));
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}