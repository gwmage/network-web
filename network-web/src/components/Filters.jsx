```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

describe('Filters Component', () => {
  const mockCategories = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
  ];

  const mockTags = [
    { id: '1', name: 'Tag 1' },
    { id: '2', name: 'Tag 2' },
  ];

  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockCategories) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockTags) });

    mockOnFilterChange.mockClear();
  });

  it('renders filter options correctly', async () => {
    render(<Filters onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();

    expect(await screen.findByText('Category 1')).toBeInTheDocument();
    expect(await screen.findByText('Category 2')).toBeInTheDocument();


    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(await screen.findByText('Tag 1')).toBeInTheDocument();
    expect(await screen.findByText('Tag 2')).toBeInTheDocument();

  });



  it('updates filters on selection change', async () => {
    render(<Filters onFilterChange={mockOnFilterChange} />);

    // select a category
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: '1', tags: [] });

    // select a tag
    fireEvent.click(await screen.findByLabelText('Tag 1'));
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: '1', tags: ['1'] });


    fireEvent.click(await screen.findByLabelText('Tag 2'));
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: '1', tags: ['1', '2'] });

    // deselect a tag
    fireEvent.click(await screen.findByLabelText('Tag 1'));
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: '1', tags: ['2'] });


    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: '2', tags: ['2'] });


    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: '', tags: ['2'] });
  });




  it('handles fetch errors gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject('API Error')); // Simulate an API error
    render(<Filters onFilterChange={mockOnFilterChange} />);

    // Expect that no options are rendered since fetch failed
    expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Tag 1')).not.toBeInTheDocument();
  });




});

```