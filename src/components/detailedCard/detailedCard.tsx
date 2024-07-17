import React, { useEffect, useState } from 'react';
import './detailedCard.scss';
import {
  defer,
  Link,
  Params,
  useLoaderData,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { searchShowById } from '../../api/apiHandler';
import { DetailedCardData } from '../../interfaces/interfaces';
import SearchLoader from '../loader/loader';

// export const detailedCardLoader = async ({
//   params
// }: {
//   params: Params<string>;
// }) => {
//   if (params.detailedId) {
//     try {
//       const promise = searchShowById(params.detailedId);
//       return defer({ promise });
//     } catch (error) {
//       console.error('Error fetching detailed card data:', error);
//       throw error;
//     }
//   }
// };
export const detailedCardLoader = async ({
  params
}: {
  params: Params<string>;
}) => {
  if (params.detailedId) {
    try {
      const detailedCardData = await searchShowById(params.detailedId);
      console.log(detailedCardData);
      return detailedCardData;
    } catch (error) {
      console.error('Error fetching detailed card data:', error);
      throw error;
    }
  }
  return null;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailedId = searchParams.get('detailedId');

  const loaderData = useLoaderData() as DetailedCardData;

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

  return loaderData ? (
    <div className="detailed-card">
      <button className="detailed-card__close-btn">Close</button>
      <img
        src={loaderData.Poster}
        alt={`${loaderData.Title} poster`}
        className="detailed-card__poster"
      />
      <div className="detailed-card__content">
        <h2 className="detailed-card__title">{loaderData.Title}</h2>
        <p className="detailed-card__year">Year: {loaderData.Year}</p>
        <p className="detailed-card__director">
          Director: {loaderData.Director}
        </p>
        <p className="detailed-card__description">{loaderData.Plot}</p>
      </div>
    </div>
  ) : (
    <SearchLoader isLoading={true} />
  );
};

export default DetailedCard;
