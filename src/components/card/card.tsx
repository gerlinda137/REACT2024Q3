import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss';

interface CardProps {
  id: string;
  title: string;
  year: string;
  image: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ id, title, year, image, className }) => {
  // const showDescription = description
  //   ? truncateString(description, 150)
  //   : 'No description';
  const cardImage =
    image === 'N/A'
      ? 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
      : image;

  return (
    <div className={`card ${className}`} id={id}>
      <Link to={'/:' + id}>
        <img src={cardImage} alt="Show poster" className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{year}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
