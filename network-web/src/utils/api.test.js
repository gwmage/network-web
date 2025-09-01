```typescript
import * as api from '../utils/api';
import axios from 'axios';

jest.mock('axios');

describe('API interaction functions', () => {
  it('submitMatchingForm formats request correctly and handles success', async () => {
    const mockFormData = { name: 'Test User', interests: ['Hiking', 'Reading'] };
    const mockResponse = { data: { groupId: 123 } };
    axios.post.mockResolvedValue(mockResponse);

    const response = await api.submitMatchingForm(mockFormData);

    expect(axios.post).toHaveBeenCalledWith('/api/matching', mockFormData);
    expect(response).toEqual(mockResponse.data);
  });

  it('submitMatchingForm handles errors', async () => {
    const mockError = new Error('Network error');
    axios.post.mockRejectedValue(mockError);

    await expect(api.submitMatchingForm({})).rejects.toThrow(mockError);
  });

  it('getMatchingVisualization formats request correctly and handles success', async () => {
    const groupId = 123;
    const mockResponse = { data: { visualizationData: 'some data' } };
    axios.get.mockResolvedValue(mockResponse);

    const response = await api.getMatchingVisualization(groupId);

    expect(axios.get).toHaveBeenCalledWith(`/api/matching/${groupId}/visualization`);
    expect(response).toEqual(mockResponse.data);
  });

  it('getMatchingVisualization handles errors', async () => {
    const mockError = new Error('Network error');
    axios.get.mockRejectedValue(mockError);

    await expect(api.getMatchingVisualization(123)).rejects.toThrow(mockError);
  });
});

```