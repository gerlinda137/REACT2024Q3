import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

export const searchShows = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/shows`, {
      params: {
        q: query
      }
    });
    return response.data; // Returns an array of shows matching the query
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
};
