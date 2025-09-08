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
      console.error('Client-side error:', event.error.message, event.filename, event.lineno, event.colno);
      // Log the entire error object for debugging purposes
      console.error('Full error object:', event.error);
      // Or, if available and more appropriate for your use case: 
      // console.error('Error stack:', event.error.stack);      
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}