import React, { Component } from 'react';

interface CardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
}

export default class Card extends Component<CardProps> {
  render() {
    const { image, title, description, className } = this.props;
    return (
      <div className={`card ${className}`}>
        <img src={image} alt={title} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      </div>
    );
  }
}
