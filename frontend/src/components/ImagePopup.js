import React from 'react';
import closeiconPath from '../images/closeicon.svg';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-img ${card.src && 'popup_opened'}`}>
      <div className="popup-img__wrapper">
        <img className="popup-img__img" src={card.src} alt={card.title} />
        <h2 className="popup-img__title">{card.title}</h2>
        <button
          className="popup-img__close popup__close"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-img"
            alt="кнопка закрытия поп-апа."
            src={closeiconPath}
          />
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;
