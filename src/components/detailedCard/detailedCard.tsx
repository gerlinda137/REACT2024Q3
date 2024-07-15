import React from 'react';
import './detailedCard.scss';
import { Link, Params, useLoaderData } from 'react-router-dom';
import { searchShowById } from '../../api/apiHandler';
import { DetailedCardData } from '../../interfaces/interfaces';

export const loader = async ({ params }: { params: Params<string> }) => {
  if (params.detailedId) {
    try {
      const detailedCard = await searchShowById(params.detailedId);
      return { detailedCard };
    } catch (error) {
      console.error('Error fetching detailed card data:', error);
      throw error;
    }
  }
};

export const DetailedCard: React.FC = () => {
  const { detailedCard } = useLoaderData() as {
    detailedCard: DetailedCardData;
  };

  return detailedCard ? (
    <div className="detailed-card">
      <Link to={'/'}>
        <button className="detailed-card__close-btn">Close</button>
      </Link>
      <img
        src={detailedCard.Poster}
        alt={`${detailedCard.Title} poster`}
        className="detailed-card__poster"
      />
      <div className="detailed-card__content">
        <h2 className="detailed-card__title">{detailedCard.Title}</h2>
        <p className="detailed-card__year">Year: {detailedCard.Year}</p>
        <p className="detailed-card__director">
          Director: {detailedCard.Director}
        </p>
        <p className="detailed-card__description">{detailedCard.Plot}</p>
      </div>
    </div>
  ) : (
    <div className="detailed-card">Error</div>
  );
};

export default DetailedCard;
