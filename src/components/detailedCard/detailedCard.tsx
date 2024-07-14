import React from 'react';
import './detailedCard.scss';
import { useLoaderData } from 'react-router-dom';
import { searchShowById } from '../../api/apiHandler';

interface DetailedCardProps {
  title: string;
  year: string;
  director: string;
  description: string;
  poster: string;
}

interface detailedCardParams {
  id: string;
}

export async function loader({ id }: detailedCardParams) {
  const detailedCard = await searchShowById(id);
  return { detailedCard };
}

const DetailedCard: React.FC<DetailedCardProps> = (/*{
  title,
  year,
  director,
  description,
  poster
}*/) => {
  const { detailedCard } = useLoaderData();
  return (
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
  );
};

export default DetailedCard;
