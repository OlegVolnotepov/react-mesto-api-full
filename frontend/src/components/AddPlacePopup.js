import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, saveButton }) {
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [errorMessageSummary, setErrorMessageSummary] = React.useState(' ');
  const [errorMessageUrl, setErrorMessageUrl] = React.useState(' ');

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(name, url);
    evt.target.reset();
    setErrorMessageSummary(' ');
    setErrorMessageUrl(' ');
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
    setErrorMessageSummary(evt.target.validationMessage);
  }

  function handleChangeUrl(evt) {
    setUrl(evt.target.value);
    setErrorMessageUrl(evt.target.validationMessage);
  }

  return (
    <PopupWithForm
      name="addplace"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        name="title"
        id="card-title"
        type="text"
        placeholder="Название"
        defaultValue=""
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
      />
      <span className="popup__error card-title-error">
        {errorMessageSummary}
      </span>
      <input
        className="popup__input popup__input_url"
        name="link"
        id="card-url"
        type="url"
        placeholder="Ссылка на картинку"
        defaultValue=""
        onChange={handleChangeUrl}
        required
      />
      <span className="popup__error card-url-error">{errorMessageUrl}</span>
      <button
        type="submit"
        className={
          errorMessageSummary || errorMessageUrl
            ? 'popup__button popup__button_disabled'
            : 'popup__button'
        }
        disabled={errorMessageSummary || errorMessageUrl ? 'disabled' : ''}
      >
        {!saveButton ? 'Сохранить' : 'Сохранение...'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
