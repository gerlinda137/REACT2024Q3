import React from 'react';
import './card.scss';

interface CardProps {
  title: string;
  year: string;
  image: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, year, image, className }) => {
  // const showDescription = description
  //   ? truncateString(description, 150)
  //   : 'No description';
  const cardImage =
    image === 'N/A'
      ? 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
      : image;

  return (
    <div className={`card ${className}`}>
      <img src={cardImage} alt="Show poster" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{year}</p>
      </div>
    </div>
  );
};

export default Card;
