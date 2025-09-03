"import axios from 'axios';
import { getMatchingStatus, getMatchingResults, getMatchingExplanations, triggerMatching } from './api';
jest.mock('axios');

describe('API functions', () => {
  it('getMatchingStatus fetches status successfully', async () => {
    const mockStatus = { state: 'completed' };
    axios.get.mockResolvedValueOnce({ data: mockStatus });
    const status = await getMatchingStatus();
    expect(status).toEqual(mockStatus);
    expect(axios.get).toHaveBeenCalledWith('/matching/status');
  });

  it('getMatchingResults fetches results successfully', async () => {
    const mockResults = [{ users: [] }];
    axios.get.mockResolvedValueOnce({ data: mockResults });
    const results = await getMatchingResults();
    expect(results).toEqual(mockResults);
    expect(axios.get).toHaveBeenCalledWith('/matching/groups');
  });

  it('getMatchingExplanations fetches explanations successfully', async () => {
    const mockExplanations = ['Explanation 1'];
    axios.get.mockResolvedValueOnce({ data: mockExplanations });
    const explanations = await getMatchingExplanations();
    expect(explanations).toEqual(mockExplanations);
    expect(axios.get).toHaveBeenCalledWith('/matching/explanations');
  });

  it('triggerMatching triggers matching successfully', async () => {
    const mockResponse = { message: 'Matching triggered' };
    axios.post.mockResolvedValueOnce({ data: mockResponse });
    const response = await triggerMatching();
    expect(response).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith('/matching');
  });

  it('handles errors for all API calls', async () => {
    const mockError = new Error('Network error');
    axios.get.mockRejectedValueOnce(mockError);
    axios.post.mockRejectedValueOnce(mockError);
    await expect(getMatchingStatus()).rejects.toThrow(mockError);
    await expect(getMatchingResults()).rejects.toThrow(mockError);
    await expect(getMatchingExplanations()).rejects.toThrow(mockError);
    await expect(triggerMatching()).rejects.toThrow(mockError);
  });
});"