import React from 'react';
import truncateString from '../../utils/truncateString';
import './card.scss';

interface CardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  className
}) => {
  const showDescription = description
    ? truncateString(description, 150)
    : 'No description';
  const cardImage = image
    ? image
    : 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';

  return (
    <div className={`card ${className}`}>
      <img src={cardImage} alt="Show poster" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p
          className="card-description"
          dangerouslySetInnerHTML={{ __html: showDescription }}
        ></p>
      </div>
    </div>
  );
};

export default Card;
