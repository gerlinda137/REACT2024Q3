import axios from 'axios';
import { DetailedCardData, Result } from '../interfaces/interfaces';

export const searchShowById = async (id: string) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY as string;
    const BASE_URL = `https://www.omdbapi.com/?apikey=${apiKey}`;
    const cardId = id;
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        i: cardId
      }
    });

    return response.data as DetailedCardData;
  } catch (error) {
    console.error('Error getting show:', error);
    throw error;
  }
};

export const searchShows = async (query?: string, page: number = 1) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY as string;
    const BASE_URL = `https://www.omdbapi.com/?apikey=${apiKey}`;

    const response = await axios.get(`${BASE_URL}`, {
      params: {
        s: query,
        page
      }
    });
    console.log(response.data);
    return response.data;

    return response.data.Search as Result[];
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
};
