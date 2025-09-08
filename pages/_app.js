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

      // Safely access error properties, checking for their existence first
      if (event.error) {
        console.error('Error stack:', event.error.stack);
        console.error('Error name:', event.error.name);
        // Log the entire error object as a JSON string for debugging
        try {
          console.error('Full error object (JSON):', JSON.stringify(event.error));
        } catch (jsonError) {
          console.error('Error stringifying error object:', jsonError);
        }
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}