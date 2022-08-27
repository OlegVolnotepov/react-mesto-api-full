import React from 'react';
import plusButtonPath from '../images/plus.svg';
import editButtonPath from '../images/edit_button.svg';
import Card from './Card';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div className='profile__wrapper'>
          <img
            src={currentUser.avatar}
            className='profile__avatar'
            alt='аватар.'
          />
          <button
            onClick={onEditAvatar}
            className='profile__avatar-button'
          ></button>
          <div className='profile__info'>
            <div className='profile__name-wrapper'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className='profile__edit-button'
                type='button'
              >
                <img
                  className='profile__edit'
                  src={editButtonPath}
                  alt='кнопка редактирования профиля.'
                />
              </button>
            </div>
            <p className='profile__about'>{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} className='profile__add-button'>
          <img src={plusButtonPath} alt='кнопка Добавить.' />
        </button>
      </section>
      <div>
        <ul className='elements'>
          {cards.map((card) => (
            //<Card key={card.id} {...card} onCardClick={test} />
            <Card
              key={card.id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              cards={card}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
