```jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminMatching from './AdminMatching';
import * as api from '../utils/api';

jest.mock('../utils/api'); // Mock the api module

describe('AdminMatching Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    api.getMatchingStatus.mockResolvedValue({ state: 'idle' });
    api.getMatchingResults.mockResolvedValue([]); // Initially no results
    api.getMatchingWeights.mockResolvedValue({});
    api.getMatchingGroups.mockResolvedValue([]);
    api.getMatchingCriteria.mockResolvedValue([]);
  });

  it('renders without crashing', async () => {
    render(<AdminMatching />);
    // Check if basic elements are present
    expect(screen.getByRole('heading', { name: /Matching Management/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Trigger Matching/i })).toBeInTheDocument();


    await waitFor(() => expect(api.getMatchingStatus).toHaveBeenCalled());


  });

  it('triggers matching and updates status', async () => {
    api.triggerMatching.mockResolvedValue({});
    api.getMatchingStatus.mockResolvedValueOnce({ state: 'running' }).mockResolvedValueOnce({ state: 'completed' });
    api.getMatchingResults.mockResolvedValueOnce([{ id: 1, users: [] }]); // Mock some results

    render(<AdminMatching />);
    fireEvent.click(screen.getByRole('button', { name: /Trigger Matching/i }));


    expect(screen.getByRole('button', { name: /Triggering\.\.\./i })).toBeInTheDocument();


    await waitFor(() => expect(api.triggerMatching).toHaveBeenCalled());
    await waitFor(() => expect(api.getMatchingStatus).toHaveBeenCalledTimes(3)); // Called initially + twice after triggering

    // Check if the component reflects the new status and results


  });



  it('displays matching results', async () => {
    api.getMatchingResults.mockResolvedValue([
        { id: 1, users: [{ id: 101, name: 'User A' }, { id: 102, name: 'User B' }] },
        { id: 2, users: [{ id: 103, name: 'User C' }] }
      ]);
      render(<AdminMatching />);
      await waitFor(() => expect(screen.getByText('Group 1')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('User A')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('User B')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Group 2')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('User C')).toBeInTheDocument());

  });

    // Add more tests for other functionalities (modifying matches, updating weights, criteria configuration, etc.)

    it('updates weights', async () => {
        api.getMatchingWeights.mockResolvedValue({ factor1: 0.5, factor2: 0.3 });
        api.updateMatchingWeights.mockResolvedValue({ factor1: 0.7, factor2: 0.3 });

        render(<AdminMatching />);

        // Find the input fields and change the values
        const factor1Input = screen.getByLabelText(/factor1/i);
        const factor2Input = screen.getByLabelText(/factor2/i);

        fireEvent.change(factor1Input, { target: { value: 0.7 } });



        fireEvent.click(screen.getByRole('button', { name: /Update Weights/i }));

        await waitFor(() => expect(api.updateMatchingWeights).toHaveBeenCalledWith({ factor1: 0.7, factor2: 0.3 }));

        // Assertions after update


    });

    // ... other test cases

    it('removes a user from a group', async () => {
        const groupId = 1;
        const userId = 101;
        api.getMatchingGroups.mockResolvedValue([{ id: groupId, users: [{ id: userId, name: 'User A' }] }]);
        api.removeUserFromGroup.mockResolvedValue([{ id: groupId, users: [] }]);


        render(<AdminMatching />);

        await waitFor(() => expect(screen.getByText('User A')).toBeInTheDocument());

        fireEvent.click(screen.getByRole('button', { name: 'delete' })); // Click the delete button

        await waitFor(() => expect(api.removeUserFromGroup).toHaveBeenCalledWith(groupId, userId));
        await waitFor(() => expect(screen.queryByText('User A')).not.toBeInTheDocument());  // User should be removed

    });



});

```