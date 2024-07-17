import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface CardProps {
  id: string;
  title: string;
  year: string;
  image: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ id, title, year, image, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCardClick = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    if (id) {
      currentSearchParams.set('detailed', id);
      navigate({ search: `?${currentSearchParams.toString()}` });
    }
  };

  const cardImage =
    image === 'N/A'
      ? 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
      : image;

  return (
    <div className={`card ${className}`} id={id} onClick={handleCardClick}>
      <img src={cardImage} alt="Show poster" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{year}</p>
      </div>
    </div>
  );
};

export default Card;
