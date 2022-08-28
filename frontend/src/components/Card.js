import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ cards, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = cards.owner === currentUser._id;
  const trashClass = isOwn
    ? `elements__trash elements__trash_active`
    : `elements__trash`;

  const isLiked = cards.likes.some((i) => i === currentUser._id);

  const likeClass = isLiked
    ? `elements__like elements__like_active`
    : `elements__like`;

  function handleClick() {
    onCardClick(cards.link, cards.name);
  }

  function handleLikeClick() {
    onCardLike(cards.likes, cards.id);
  }

  function handleDeleteClick() {
    onCardDelete(cards.id);
  }

  return (
    <li className='elements__card'>
      <img
        className='elements__img'
        src={cards.link}
        alt={cards.name}
        onClick={handleClick}
      />
      <div className='elements__summary'>
        <p className='elements__title'>{cards.name}</p>
        <button className={trashClass} onClick={handleDeleteClick}></button>
        <div className='elements__like-group'>
          <button
            className={likeClass}
            id='elements__like'
            onClick={handleLikeClick}
          ></button>
          <div className='elements__like-counter'>{cards.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
