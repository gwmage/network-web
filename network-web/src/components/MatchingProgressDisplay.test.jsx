// File: network-web/src/components/MatchingProgressDisplay.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MatchingProgressDisplay from '../components/MatchingProgressDisplay';
import * as api from '../utils/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

jest.mock('../utils/api');

describe('MatchingProgressDisplay Component', () => {
  it('should display loading state while fetching data', async () => {
    api.getMatchingVisualization.mockImplementation(() => new Promise(() => {}));
    render(<BrowserRouter><Routes><Route path="/:groupId" element={<MatchingProgressDisplay />} /></Routes></BrowserRouter>, { route: '/1' });
    expect(screen.getByText('Fetching matching status...')).toBeInTheDocument();
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
      const container = screen.getByTestId('visualization-container');
      expect(container.innerHTML).toContain(mockVisualizationData);
    });
  });
});