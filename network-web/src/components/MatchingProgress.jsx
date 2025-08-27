```typescript
import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import * as api from '../utils/api'; // Import the API functions
import { useParams } from 'react-router-dom';

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
    }


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
      <div>
        <Typography variant="body1" gutterBottom>{statusMessage}</Typography>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (visualizationData) {
    // Render the visualization data based on its type
    if (typeof visualizationData === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: visualizationData }} />; // For SVG, ensure safe rendering
    } else if (typeof visualizationData === 'object') {
      return <pre>{JSON.stringify(visualizationData, null, 2)}</pre>; // For JSON data
    } else {
      return <div>Visualization data format not supported.</div>;
    }
  }


  return <div>No visualization data available.</div>;
};

export default MatchingProgress;

```