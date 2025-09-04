```js
import axios from 'axios';
import * as api from './api';

jest.mock('axios');

const API_BASE_URL = process.env.REACT_APP_API_URL;

describe('API Utility Functions', () => {
    // ... (Tests for existing functions)



  describe('getMatchingCriteria', () => {
    it('fetches matching criteria', async () => {
      const mockCriteria = ['criterion1', 'criterion2'];
      axios.get.mockResolvedValue({ data: mockCriteria });
      const result = await api.getMatchingCriteria();
      expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/matching/criteria`);
      expect(result).toEqual(mockCriteria);
    });


    it('handles errors', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));


        await expect(api.getMatchingCriteria()).rejects.toThrowError(errorMessage);


        expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/matching/criteria`);

      });



  });

  describe('addMatchingCriterion', () => {
    it('adds a new criterion', async () => {

        const newCriterion = 'New Criterion';
        const updatedCriteria = ['existingCriterion', newCriterion];
        axios.post.mockResolvedValueOnce({ data: updatedCriteria });

        const result = await api.addMatchingCriterion(newCriterion);
        expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/matching/criteria`, { criterion: newCriterion });
        expect(result).toEqual(updatedCriteria);
      });
  });

  describe('removeMatchingCriterion', () => {
    it('removes a criterion', async () => {
        const criterionToRemove = 'criterionToRemove';
        const updatedCriteria = ['criterion1', 'criterion2'];
        axios.delete.mockResolvedValueOnce({ data: updatedCriteria });

        const result = await api.removeMatchingCriterion(criterionToRemove);

        expect(axios.delete).toHaveBeenCalledWith(`${API_BASE_URL}/matching/criteria/${criterionToRemove}`);
        expect(result).toEqual(updatedCriteria);

      });
  });




  describe('removeUserFromGroup', () => {
    it('removes a user from a group', async () => {
      const groupId = 1;
      const userId = 101;
      const mockResponse = { data: { success: true } }; // Example success response
      axios.delete.mockResolvedValue(mockResponse);

      const result = await api.removeUserFromGroup(groupId, userId);
      expect(axios.delete).toHaveBeenCalledWith(`${API_BASE_URL}/matching/groups/${groupId}/users/${userId}`);
      expect(result).toEqual(mockResponse.data);
    });

    it('handles errors when removing user', async () => {
        const groupId = 1;
        const userId = 101;
        const errorMessage = 'Error removing user';
        axios.delete.mockRejectedValueOnce(new Error(errorMessage));

        await expect(api.removeUserFromGroup(groupId, userId)).rejects.toThrow(errorMessage);
        expect(axios.delete).toHaveBeenCalledWith(`${API_BASE_URL}/matching/groups/${groupId}/users/${userId}`);
      });

  });



});

```