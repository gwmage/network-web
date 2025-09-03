"import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MatchingManagement from './MatchingManagement';
import { getMatchingStatus, getMatchingResults, getMatchingExplanations, triggerMatching } from '../utils/api';
import mockAxios from 'axios';
jest.mock('axios'); // Mocking axios

describe('MatchingManagement Component', () => {
  it('renders loading state while fetching data', async () => {
    render(<MatchingManagement />);
    // Check for loading indicator (replace with your actual loading indicator)
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
  });

  it('fetches and displays matching data', async () => {
    const mockStatus = { state: 'completed' };
    const mockResults = [{ users: [{ id: 1, name: 'User 1' }] }];
    const mockExplanations = ['Explanation 1'];
    mockAxios.get.mockResolvedValueOnce({ data: mockStatus });
    mockAxios.get.mockResolvedValueOnce({ data: mockResults });
    mockAxios.get.mockResolvedValueOnce({ data: mockExplanations });

    render(<MatchingManagement />);
    await waitFor(() => expect(screen.getByText('Matching Status: completed')).toBeInTheDocument());
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('Explanation: Explanation 1')).toBeInTheDocument();
  });

  it('handles errors during data fetching', async () => {
    const mockError = new Error('Failed to fetch data');
    mockAxios.get.mockRejectedValueOnce(mockError);

    render(<MatchingManagement />);
    await waitFor(() => expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument());
  });

  it('triggers matching and updates data', async () => {
    const mockStatus = { state: 'running' };
    const mockResults = [];
    const mockExplanations = [];
    mockAxios.post.mockResolvedValueOnce({});
    mockAxios.get.mockResolvedValueOnce({ data: mockStatus });
    mockAxios.get.mockResolvedValueOnce({ data: mockResults });
    mockAxios.get.mockResolvedValueOnce({ data: mockExplanations });

    render(<MatchingManagement />);
    const triggerButton = screen.getByRole('button', { name: /Trigger Matching/i });
    await userEvent.click(triggerButton);

    await waitFor(() => expect(screen.getByText('Matching Status: running')).toBeInTheDocument());

    mockAxios.post.mockReset();
    mockAxios.get.mockReset();
  });
});"