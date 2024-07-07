import React, { Component } from 'react';

interface CardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

export default class Card extends Component<CardProps> {
  render() {
    const { title, description, image, className } = this.props;
    return (
      <div className={`card ${className}`}>
        <img src={image} alt="Show poster" className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      </div>
    );
  }
}
