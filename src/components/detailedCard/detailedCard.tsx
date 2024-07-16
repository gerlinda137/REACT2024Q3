import React, { useEffect, useState } from 'react';
import './detailedCard.scss';
import { defer, Link, Params, useLoaderData } from 'react-router-dom';
import { searchShowById } from '../../api/apiHandler';
import { DetailedCardData } from '../../interfaces/interfaces';
import SearchLoader from '../loader/loader';

export const detailedCardLoader = async ({
  params
}: {
  params: Params<string>;
}) => {
  if (params.detailedId) {
    try {
      const promise = searchShowById(params.detailedId);
      return defer({ promise });
    } catch (error) {
      console.error('Error fetching detailed card data:', error);
      throw error;
    }
  }
};

interface DetailedCardLoaderData {
  promise: Promise<DetailedCardData>;
}

interface ErrorResponse {
  Response: string;
  Error: string;
}

export const DetailedCard: React.FC = () => {
  const [detailedCard, setDetailedCard] = useState<
    DetailedCardData | undefined
  >();

  const loaderData = useLoaderData() as DetailedCardLoaderData;

  useEffect(() => {
    const asyncFn = async () => {
      const cardData = await loaderData.promise;
      //to-do: api doesn't return an error when id not found
      setDetailedCard(cardData);
    };
    asyncFn();

    return () => {
      setDetailedCard(undefined);
    };
  }, [loaderData]);

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
    <SearchLoader isLoading={true} />
  );
};

export default DetailedCard;
