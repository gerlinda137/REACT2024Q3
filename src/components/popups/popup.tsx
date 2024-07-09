import React, { Component } from 'react';

export interface PopupProps {
  title: string;
  message: string;
  isShown: boolean;
  onClose: () => void;
}

export default class Popup extends Component<PopupProps> {
  toggleVisibility() {
    this.props.onClose();
  }

  render(): React.ReactNode {
    const { title, message, isShown } = this.props;
    if (!isShown) return null;

    return (
      <div className="popup">
        <h2 className="popup__title">{title}</h2>
        <p className="popup__message">{message}</p>
        <button className="popup__btn" onClick={() => this.toggleVisibility}>
          Ok
        </button>
      </div>
    );
  }
}
