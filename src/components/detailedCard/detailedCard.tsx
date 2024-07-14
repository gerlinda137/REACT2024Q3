import React from 'react';
import './detailedCard.scss';
import { useLoaderData } from 'react-router-dom';
import { searchShowById } from '../../api/apiHandler';
import {
  DetailedCardParams,
  DetailedCardData
} from '../../interfaces/interfaces';

export const loader = async ({ id }: DetailedCardParams) => {
  try {
    const detailedCardData = await searchShowById(id);
    return { detailedCardData };
  } catch (error) {
    console.error('Error fetching detailed card data:', error);
    throw error;
  }
};

export const DetailedCard: React.FC = () => {
  const { detailedCard } = useLoaderData() as {
    detailedCard: DetailedCardData;
  };
  console.log(detailedCard);
  return detailedCard ? (
    <div className="detailed-card">
      <img
        src={detailedCard.poster}
        alt={`${detailedCard.title} poster`}
        className="detailed-card__poster"
      />
      <div className="detailed-card__content">
        <h2 className="detailed-card__title">{detailedCard.title}</h2>
        <p className="detailed-card__year">Year: {detailedCard.year}</p>
        <p className="detailed-card__director">
          Director: {detailedCard.director}
        </p>
        <p className="detailed-card__description">{detailedCard.plot}</p>
      </div>
    </div>
  ) : (
    <div>Error</div>
  );
};

export default DetailedCard;
