import React from 'react';
import './card.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Checkbox from '../checkbox/checkbox';

interface CardProps {
  id: string;
  title: string;
  year: string;
  image: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ id, title, year, image, className }) => {
  const [searchParams] = useSearchParams();
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
    // <button className={`card ${className}`} id={id} onClick={handleCardClick}>
    //   <img src={cardImage} alt="Show poster" className="card-image" />
    //   <div className="card-content">
    //     <h2 className="card-title">{title}</h2>
    //     <p className="card-description">{year}</p>
    //   </div>
    // </button>
    <div className={`card ${className}`} id={id}>
      <Checkbox id={id} label="Select" />
      <button className="card-button" onClick={handleCardClick}>
        <img src={cardImage} alt="Show poster" className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{year}</p>
        </div>
      </button>
    </div>
  );
};

export default Card;
