```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MatchingProgress from '../components/MatchingProgress';
import * as api from '../utils/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


jest.mock('../utils/api');

describe('MatchingProgress Component', () => {
  it('should display loading state while fetching data', async () => {
    api.getMatchingStatus.mockImplementation(() => new Promise(() => {})); // Mock API call to never resolve
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgress />} /></Routes></BrowserRouter>, { route: '/1' });
    expect(screen.getByText('Fetching matching status...')).toBeInTheDocument();
  });


  it('should display error message if API call fails', async () => {
    const errorMessage = 'Failed to fetch data';
    api.getMatchingStatus.mockRejectedValue(new Error(errorMessage));
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgress />} /></Routes></BrowserRouter>, { route: '/1' });

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('should render visualization data when API call succeeds', async () => {
    const mockVisualizationData = '<svg></svg>'; // Example SVG data
    api.getMatchingStatus.mockResolvedValue({ completed: true });
    api.getMatchingVisualization.mockResolvedValue(mockVisualizationData);

    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgress />} /></Routes></BrowserRouter>, { route: '/1' });

    await waitFor(() => {
      const container = screen.getByRole('presentation');
      expect(container.innerHTML).toContain(mockVisualizationData);
    });
  });


  it('should render JSON visualization data when API call succeeds', async () => {
    const mockVisualizationData = { nodes: [], links: [] }; // Example JSON data
    api.getMatchingStatus.mockResolvedValue({ completed: true });
    api.getMatchingVisualization.mockResolvedValue(mockVisualizationData);
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgress />} /></Routes></BrowserRouter>, { route: '/1' });

    await waitFor(() => {
      expect(screen.getByText(JSON.stringify(mockVisualizationData, null, 2))).toBeInTheDocument();
    });
  });


  it('should display a message if no visualization data is available', async () => {
    api.getMatchingStatus.mockResolvedValue({ completed: true });
    api.getMatchingVisualization.mockResolvedValue(null);
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgress />} /></Routes></BrowserRouter>, { route: '/1' });

    await waitFor(() => {
      expect(screen.getByText('No visualization data available.')).toBeInTheDocument();
    });
  });

  it('should update progress and status message', async () => {
    api.getMatchingStatus
      .mockResolvedValueOnce({ progress: 30, status: 'In progress...' })
      .mockResolvedValueOnce({ progress: 60, status: 'Still in progress...' })
      .mockResolvedValueOnce({ progress: 100, status: 'Completed!', completed: true });
    api.getMatchingVisualization.mockResolvedValue(null); // Mock visualization data
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgress />} /></Routes></BrowserRouter>, { route: '/1' });
    await waitFor(() => expect(screen.getByText('In progress...')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Still in progress...')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Completed!')).toBeInTheDocument());


  });


});

```