import React, { Component } from 'react';
import truncateString from '../../utils/truncateString';
import './card.scss';

interface CardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

export default class Card extends Component<CardProps> {
  render() {
    const { title, description, image, className } = this.props;
    let showDescription = '';
    if (description) {
      showDescription = truncateString(description, 150);
    } else {
      showDescription = 'No description';
    }

    let cardImage = '';
    if (image) {
      cardImage = image;
    } else {
      cardImage =
        'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';
    }

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
  }
}
