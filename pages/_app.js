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

      // Correctly log the error object
      console.error('Error Object:', JSON.stringify(event.error));
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}