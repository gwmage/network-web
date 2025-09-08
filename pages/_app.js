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

      // Safely serialize the error object, handling circular structures
      function safeSerializeError(error) {
        let cache = [];
        const serializedError = JSON.stringify(error, function(key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        });
        cache = null; // Enable garbage collection
        return serializedError;
      }

      console.error('Error Object:', safeSerializeError(event.error));
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}