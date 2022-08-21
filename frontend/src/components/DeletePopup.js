import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup({ isOpen, onClose, onDeleteCard, saveButton }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard();
    evt.target.reset();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверенены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="popup-remove-card__form"
    >
      <button type="submit" className="popup__button popup-remove-card__button">
        {!saveButton ? 'Да' : 'Удаление...'}
      </button>
    </PopupWithForm>
  );
}

export default DeletePopup;
