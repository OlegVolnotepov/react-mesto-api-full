import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  src,
  title,
  likes,
  id,
  onCardClick,
  owner,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  //console.log(currentUser);
  const isOwn = owner === currentUser._id;
  const trashClass = isOwn
    ? `elements__trash elements__trash_active`
    : `elements__trash`;

  const isLiked = likes.some((i) => i._id === currentUser._id);
  const likeClass = isLiked
    ? `elements__like elements__like_active`
    : `elements__like`;

  function handleClick() {
    onCardClick(src, title);
  }

  function handleLikeClick() {
    onCardLike(likes, id);
  }

  function handleDeleteClick() {
    onCardDelete(id);
  }

  return (
    <li className="elements__card">
      <img
        className="elements__img"
        src={src}
        alt={title}
        onClick={handleClick}
      />
      <div className="elements__summary">
        <p className="elements__title">{title}</p>
        <button className={trashClass} onClick={handleDeleteClick}></button>
        <div className="elements__like-group">
          <button
            className={likeClass}
            id="elements__like"
            onClick={handleLikeClick}
          ></button>
          <div className="elements__like-counter">{likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
