import React, { Component } from 'react';

interface CardProps {
  title: string;
  description: string;
  className?: string;
}

export default class Card extends Component<CardProps> {
  render() {
    const { title, description, className } = this.props;
    return (
      <div className={`card ${className}`}>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      </div>
    );
  }
}
