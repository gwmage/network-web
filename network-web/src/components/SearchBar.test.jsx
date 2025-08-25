```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('SearchBar Component', () => {
  it('updates search term on input change', () => {
    render(<SearchBar />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
  });

  it('calls search API on form submit', async () => {
    const mockSearchResults = { items: [], meta: { totalPages: 0 } };
    api.searchPosts.mockResolvedValue(mockSearchResults);

    render(<SearchBar />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.submit(screen.getByRole('search'));

    await waitFor(() => expect(api.searchPosts).toHaveBeenCalledWith({ keyword: 'test', page: 1, limit: 10 }));
  });

  it('displays autocomplete suggestions', async () => {
    const mockSuggestions = ['test 1', 'test 2'];
    api.getAutocompleteSuggestions.mockResolvedValue(mockSuggestions);

    render(<SearchBar />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    await waitFor(() => expect(api.getAutocompleteSuggestions).toHaveBeenCalledWith('test'));
    // Add assertions to check if suggestions are displayed in the UI
    mockSuggestions.forEach(suggestion => {
      expect(screen.getByText(suggestion)).toBeVisible();
    });


  });


  it('handles empty search term', async () => {
    const mockSearchResults = { items: [], meta: { totalPages: 0 } };
    api.searchPosts.mockResolvedValue(mockSearchResults);

    render(<SearchBar />);

    fireEvent.submit(screen.getByRole('search'));
    await waitFor(() => expect(api.searchPosts).toHaveBeenCalledWith({ keyword: '', page: 1, limit: 10 }));
  });

  it('handles API error', async () => {
    const mockError = new Error('API Error');
    api.searchPosts.mockRejectedValue(mockError);
    // Implement error handling logic in the component
    render(<SearchBar />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.submit(screen.getByRole('search'));

    // Add assertions to check for error message display or other error handling behavior
    // Example:
    // await waitFor(() => expect(screen.getByText('Error: API Error')).toBeVisible());
  });
});
```