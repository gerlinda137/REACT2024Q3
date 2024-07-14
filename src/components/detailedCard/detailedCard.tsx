import React from 'react';
import './detailedCard.scss';
import { useLoaderData } from 'react-router-dom';
import { searchShowById } from '../../api/apiHandler';
import {
  DetailedCardParams,
  DetailedCardProps,
  DetailedCardData
} from '../../interfaces/interfaces';

export async function loader({ id }: DetailedCardParams) {
  const detailedCard = await searchShowById(id);
  return { detailedCard };
}

export const DetailedCard: React.FC<DetailedCardProps> = (/*{
  title,
  year,
  director,
  description,
  poster
}*/) => {
  // const detailedCard = useLoaderData() as DetailedCardData;

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
