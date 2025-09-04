```jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MatchingCriteriaConfiguration from './MatchingCriteriaConfiguration';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('MatchingCriteriaConfiguration', () => {
  const mockCriteria = ['Skill Level', 'Interests', 'Availability'];
  const setCriteria = jest.fn();


  beforeEach(() => {
    api.getMatchingCriteria.mockResolvedValue(mockCriteria);
    api.addMatchingCriterion.mockResolvedValue([...mockCriteria, 'New Criterion']);
    setCriteria.mockClear();
  });


  it('renders without crashing', async () => {
    render(<MatchingCriteriaConfiguration criteria={mockCriteria} setCriteria={setCriteria} />);
    expect(screen.getByRole('heading', { name: /Matching Criteria/i })).toBeInTheDocument();

  });

  it('adds a new criterion', async () => {
    render(<MatchingCriteriaConfiguration criteria={mockCriteria} setCriteria={setCriteria} />);
    const newCriterionInput = screen.getByLabelText(/New Criterion/i);
    fireEvent.change(newCriterionInput, { target: { value: 'New Criterion' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Criterion/i }));

    await waitFor(() => expect(api.addMatchingCriterion).toHaveBeenCalledWith('New Criterion'));
    expect(setCriteria).toHaveBeenCalledWith([...mockCriteria, 'New Criterion']);

  });

  it('removes a criterion', async () => {

    api.removeMatchingCriterion.mockResolvedValue(['Skill Level', 'Availability']); // Mock the updated criteria after removal

    render(<MatchingCriteriaConfiguration criteria={mockCriteria} setCriteria={setCriteria} />);
    // Wait for the criteria to be rendered
    await waitFor(() => expect(screen.getByText('Interests')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'delete', exact: false }));

    await waitFor(() => expect(api.removeMatchingCriterion).toHaveBeenCalledWith('Interests'));

    expect(setCriteria).toHaveBeenCalledWith(['Skill Level', 'Availability']);

  });

  // Add more tests for error handling, input validation, etc. as needed.


});


```