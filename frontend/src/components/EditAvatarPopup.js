import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, saveButton }) {
  const avatarRef = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState(' ');

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    event.target.reset();
  }

  function checkValidity(evt) {
    setErrorMessage(evt.target.validationMessage);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_url"
        name="link"
        id="avatar-url"
        type="url"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
        defaultValue=""
        onChange={checkValidity}
      />
      <span className="popup__error avatar-url-error">{errorMessage}</span>
      <button
        disabled={!errorMessage ? '' : 'disabled'}
        type="submit"
        className={
          !errorMessage
            ? 'popup__button'
            : 'popup__button popup__button_disabled'
        }
      >
        {!saveButton ? 'Сохранить' : 'Сохранение...'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
