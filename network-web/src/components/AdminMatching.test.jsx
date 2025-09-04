```jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminMatching from './AdminMatching';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('AdminMatching', () => {
  beforeEach(() => {
    api.getMatchingStatus.mockResolvedValue({ status: 'idle' });
    api.getMatchingResults.mockResolvedValue(null);
    api.getMatchingWeights.mockResolvedValue({ criterion1: 0.5, criterion2: 0.3 });
  });

  it('renders the component and fetches initial data', async () => {
    render(<AdminMatching />);
    expect(screen.getByRole('heading', { name: /Matching Management/i })).toBeInTheDocument();

    expect(api.getMatchingStatus).toHaveBeenCalled();
    expect(api.getMatchingResults).toHaveBeenCalled();
    expect(api.getMatchingWeights).toHaveBeenCalled();


  });


  it('triggers matching when the button is clicked', async () => {
    render(<AdminMatching />);
    fireEvent.click(screen.getByRole('button', { name: /Trigger Matching/i }));


    expect(screen.getByRole('button', { name: /Triggering\.\.\./i })).toBeDisabled();

    await waitFor(() => expect(api.getMatchingStatus).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(api.getMatchingResults).toHaveBeenCalledTimes(2));


    expect(screen.getByRole('button', { name: /Trigger Matching/i })).not.toBeDisabled();

  });


  it('displays and updates weights', async () => {
      render(<AdminMatching />);

      await waitFor(() => expect(screen.getByLabelText(/criterion1/i)).toBeInTheDocument());
      await waitFor(() => expect(screen.getByLabelText(/criterion2/i)).toBeInTheDocument());


      fireEvent.change(screen.getByLabelText(/criterion1/i), { target: { value: '0.7' } });
      fireEvent.change(screen.getByLabelText(/criterion2/i), { target: { value: '0.1' } });


      fireEvent.click(screen.getByRole('button', { name: /Update Weights/i }));


      await waitFor(() => expect(api.updateMatchingWeights).toHaveBeenCalledWith({ criterion1: 0.7, criterion2: 0.1 }));
      expect(api.getMatchingWeights).toHaveBeenCalledTimes(2); // Ensure weights are refetched

  });


    it('handles errors during weight update', async () => {

      const error = new Error('Update Weights Error');
      api.updateMatchingWeights.mockRejectedValueOnce(error); // Mock an error for updateWeights


      render(<AdminMatching />);
      fireEvent.click(screen.getByRole('button', { name: 'Update Weights' }));


      await waitFor(() => expect(screen.getByText(/Update Weights Error/i)).toBeVisible()); // Check for error display

    });




});

```

---[END_OF_FILES]---