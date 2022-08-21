import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, saveButton }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [errorMessageName, setErrorMessageName] = React.useState();
  const [errorMessageAbout, setErrorMessageAbout] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setErrorMessageName(evt.target.validationMessage);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    setErrorMessageAbout(evt.target.validationMessage);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="name"
        name="name"
        type="text"
        placeholder="Имя"
        value={name || ''}
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span className="popup__error name-error">{errorMessageName}</span>
      <input
        className="popup__input popup__input_url"
        name="about"
        id="about"
        type="text"
        placeholder="О себе"
        value={description || ''}
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__error about-error">{errorMessageAbout}</span>
      <button
        disabled={errorMessageName || errorMessageAbout ? 'disabled' : ''}
        type="submit"
        className={
          errorMessageName || errorMessageAbout
            ? 'popup__button popup__button_disabled'
            : 'popup__button'
        }
      >
        {!saveButton ? 'Сохранить' : 'Сохранение...'}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
