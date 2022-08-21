import React from 'react';
import closeiconPath from '../images/closeicon.svg';
import successIconPath from '../images/success.svg';
import failIconPath from '../images/fail.svg';

function InfoTooltip({ regResponse, isOpen, onClose }) {
  return (
    <>
      <div
        className={
          isOpen
            ? 'popup-infotooltip popup-infotooltip_open'
            : 'popup-infotooltip'
        }
      >
        <div className="popup-infotooltip__wrapper">
          <img
            src={regResponse ? successIconPath : failIconPath}
            className="popup-infotooltip__img"
            alt={
              regResponse
                ? 'иконка успешной регистрации'
                : 'иконка не успешной регистрации'
            }
          />
          <h2 className="popup-infotooltip__title">
            {regResponse
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h2>
          <button
            className="popup-infotooltip__close"
            type="button"
            onClick={onClose}
          >
            <img
              className="popup-infotooltip__close-img"
              alt="кнопка закрытия поп-апа."
              src={closeiconPath}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
