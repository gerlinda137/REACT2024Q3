import React, { useEffect, useState } from 'react';
import './detailedCard.scss';
import { useSearchParams } from 'react-router-dom';
import { searchShowById } from '../../api/apiHandler';
import { DetailedCardData } from '../../interfaces/interfaces';
import SearchLoader from '../loader/loader';

export const DetailedCard: React.FC = () => {
  const [detailedCard, setDetailedCard] = useState<
    DetailedCardData | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailedId = searchParams.get('detailed');

  useEffect(() => {
    const fetchData = async () => {
      if (detailedId) {
        try {
          const cardData = await searchShowById(detailedId);
          setDetailedCard(cardData);
        } catch (error) {
          console.error('Error fetching detailed card data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [detailedId]);

  if (loading) {
    return <SearchLoader isLoading={true} />;
  }

  const detailedCardImg =
    detailedCard?.Poster === 'N/A'
      ? 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
      : detailedCard?.Poster;

  return detailedCard ? (
    <div className="detailed-card">
      <button
        className="detailed-card__close-btn"
        onClick={() => {
          searchParams.delete('detailed');
          setSearchParams(searchParams);
        }}
      >
        Close
      </button>
      <img
        src={detailedCardImg}
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
