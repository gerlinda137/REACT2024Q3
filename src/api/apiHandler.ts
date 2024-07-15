import axios from 'axios';
import { DetailedCardData, Result } from '../interfaces/interfaces';

export const searchShowById = async (id: string) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY as string;
    const BASE_URL = `https://www.omdbapi.com/?apikey=${apiKey}`;
    const cardId = id.substring(1);
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        i: cardId
      }
    });
    console.log(response.data);

    return response.data as DetailedCardData;
  } catch (error) {
    console.error('Error getting show:', error);
    throw error;
  }
};

export const searchShows = async (query?: string) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY as string;
    const BASE_URL = `https://www.omdbapi.com/?apikey=${apiKey}`;

    const response = await axios.get(`${BASE_URL}`, {
      params: {
        s: query
      }
    });
    console.log(response.data.Search);

    return response.data.Search as Result[];
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }

  // return [
  //   {
  //     Title: "De hel van '63",
  //     Year: '2009',
  //     imdbID: 'tt1156132',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BNTBlMjg1NDctOTkxMS00NDdhLTlkNzgtMTJhODhiMWQ5Y2YwXkEyXkFqcGdeQXVyNzE2MTQyMzM@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'Hel',
  //     Year: '2016',
  //     imdbID: 'tt3953260',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BYjc1ZTM4ODUtNTE3ZC00NzJkLTkzNjgtMWQ3M2EyN2VmNzIyXkEyXkFqcGdeQXVyNjgzMjA1NDY@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'Hel',
  //     Year: '2009',
  //     imdbID: 'tt1499230',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BZTBkZTZmOTEtODgyNi00MmVlLWE1MjgtZGIxZmZhNTIwMWE0XkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'Bock Saga: Welcome to Hel',
  //     Year: '2015',
  //     imdbID: 'tt5269370',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BNTdiYWVjY2QtYmRlMy00Mzg2LWE2ODgtODQ0NzQyNWZmODk2XkEyXkFqcGdeQXVyNjQyNzk3Njc@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'The Matrix Revolutions: Hel',
  //     Year: '2004',
  //     imdbID: 'tt5325432',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BOWUxODE3ZTYtYjU5Mi00MWYwLWExODktMDFkMWQzYzdhYTdhXkEyXkFqcGdeQXVyODA1NjQ0OTY@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'Who in the Hel Is Ior Bock?',
  //     Year: '2018',
  //     imdbID: 'tt7862550',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BZDE5MTA3MDMtZTBiMi00NjFmLTg5NzItZjU4NjcwMjI2ZTYxXkEyXkFqcGdeQXVyNDU3MzEyODQ@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'Hel',
  //     Year: '2016',
  //     imdbID: 'tt6657380',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BNDZkMzY1YWQtZmM4Yy00ZDZlLTgxYjctYmU4NDFjNDM0NjllXkEyXkFqcGdeQXVyMjMxOTE0ODI@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'Telenovelas uit de hel',
  //     Year: '2014',
  //     imdbID: 'tt7285468',
  //     Type: 'movie',
  //     Poster: 'N/A'
  //   },
  //   {
  //     Title: 'Gevlucht Uit De Hel',
  //     Year: '2015',
  //     imdbID: 'tt4701810',
  //     Type: 'movie',
  //     Poster:
  //       'https://m.media-amazon.com/images/M/MV5BNjgzNzM3NjU5NF5BMl5BanBnXkFtZTgwMzc0MjAwNjE@._V1_SX300.jpg'
  //   },
  //   {
  //     Title: 'Hel',
  //     Year: '2015',
  //     imdbID: 'tt4851634',
  //     Type: 'movie',
  //     Poster: 'N/A'
  //   }
  // ];
};
