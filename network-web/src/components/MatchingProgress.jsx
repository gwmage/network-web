```javascript
import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import * as api from '../utils/api'; // Import the API functions
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

const MatchingProgress = () => {
  const { groupId } = useParams();
  const [visualizationData, setVisualizationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Fetching matching status...');
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchMatchingStatus = async () => {
      try {
        const data = await api.getMatchingStatus(groupId);
        setProgress(data.progress || 0); // Update progress from API
        setStatusMessage(data.status || 'Matching in progress...');

        if (data.completed) {
          clearInterval(intervalId);
          fetchVisualizationData(); // Fetch visualization data once matching is complete
        }
      } catch (err) {
        setError(err);
        setLoading(false);
        clearInterval(intervalId);
      }
    };

    const fetchVisualizationData = async () => {
      try {
        const data = await api.getMatchingVisualization(groupId);
        setVisualizationData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    // Poll matching status every 3 seconds
    intervalId = setInterval(fetchMatchingStatus, 3000);
    fetchMatchingStatus(); //also call the first time immediately

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [groupId]);


  if (loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>{statusMessage}</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ width: '80%', mt: 2 }} />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{`${Math.round(progress)}%`}</Typography>
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Display visualization data (if available) after loading is complete
  return (
    <div>
      {visualizationData && (
        typeof visualizationData === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: visualizationData }} /> // For SVG or HTML content
        ) : typeof visualizationData === 'object' ? (
          <pre>{JSON.stringify(visualizationData, null, 2)}</pre> // For JSON data, for debugging or display purposes
        ) : (
          <div>Visualization data format not supported.</div>
        )
      )}

      {!visualizationData && !loading && !error && <div>No visualization data available.</div>} {/* Display message when no data exists */}
    </div>
  );
};

export default MatchingProgress;

```