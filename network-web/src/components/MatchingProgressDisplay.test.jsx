```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MatchingProgressDisplay from '../components/MatchingProgressDisplay'; // Correct import
import * as api from '../utils/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

jest.mock('../utils/api');

describe('MatchingProgressDisplay Component', () => {
  it('should display loading state while fetching data', async () => {
    api.getMatchingVisualization.mockImplementation(() => new Promise(() => {}));
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgressDisplay />} /></Routes></BrowserRouter>, { route: '/1' });
    expect(screen.getByText('Fetching matching status...')).toBeInTheDocument(); // Check for initial status message
  });

  it('should display error message if API call fails', async () => {
    const errorMessage = 'Failed to fetch data';
    api.getMatchingVisualization.mockRejectedValue(new Error(errorMessage));
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgressDisplay />} /></Routes></BrowserRouter>, { route: '/1' });
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should render SVG visualization data when API call succeeds', async () => {
    const mockVisualizationData = '<svg>Mock SVG Data</svg>';
    api.getMatchingVisualization.mockResolvedValue(mockVisualizationData);
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgressDisplay />} /></Routes></BrowserRouter>, { route: '/1' });

    await waitFor(() => {
      // Accessing innerHTML is generally not recommended but might be necessary for SVG content.  Explore other testing methods if possible.
      const container = screen.getByTestId('visualization-container'); // Add data-testid to the container div in your component
      expect(container.innerHTML).toContain(mockVisualizationData);
    });
  });

  it('should render JSON visualization data when API call succeeds', async () => {
    const mockVisualizationData = { nodes: [], links: [] };
    api.getMatchingVisualization.mockResolvedValue(mockVisualizationData);
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgressDisplay />} /></Routes></BrowserRouter>, { route: '/1' });

    await waitFor(() => {
      expect(screen.getByText(JSON.stringify(mockVisualizationData, null, 2))).toBeInTheDocument();
    });
  });

  it('should display a message if no visualization data is available', async () => {
    api.getMatchingVisualization.mockResolvedValue(null);
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgressDisplay />} /></Routes></BrowserRouter>, { route: '/1' });

    await waitFor(() => {
      expect(screen.getByText('No visualization data available.')).toBeInTheDocument();
    });
  });
});

```