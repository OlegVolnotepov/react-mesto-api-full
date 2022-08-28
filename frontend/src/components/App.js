import { React, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeletePopup from './DeletePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { register, auth, checkValidityToken } from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [saveButton, setSaveButton] = useState(false);
  const [cardIdForDelete, setCardIdForDelete] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [regResponse, setRegResponse] = useState(false);
  const [infotooltipOpen, setinfotooltipOpen] = useState(false);
  const [email, setEmail] = useState('');
  let navigate = useNavigate();
  const [cards, setCards] = useState([]);

  function getCards() {
    if (loggedIn) {
      api
        .getAllCards()
        .then((data) => {
          setCards(
            data.reverse().map((item) => ({
              name: item.name,
              link: item.link,
              likes: item.likes,
              id: item._id,
              owner: item.owner,
            }))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
    return;
  }

  useEffect(() => {
    checkResponse();
  }, []);

  useEffect(() => {
    getCards();
  }, [loggedIn]);

  function handleCardLike(card, cardId) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки

    api
      .changeLikeCardStatus(cardId, !isLiked)
      .then((data) => {
        const newCard = {
          name: data.name,
          link: data.link,
          likes: data.likes,
          id: data._id,
          owner: data.owner,
        };
        setCards((state) => state.map((c) => (c.id === cardId ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete() {
    loadButton(true);
    api
      .deleteCard(cardIdForDelete)
      .then(setCards((state) => state.filter((c) => c.id !== cardIdForDelete)))
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        loadButton(false);
        closeAllPopups();
      });
  }

  useEffect(() => {
    getUserData();
  }, [loggedIn]);

  function getUserData() {
    if (loggedIn) {
      api
        .getUser()
        .then((data) => {
          setcurrentUser(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
    return;
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleDeleteCardClick(id) {
    setCardIdForDelete(id);
    setDeletePopupOpen(!isDeletePopupOpen);
  }

  function handleCardClick(src, title) {
    setSelectedCard({ src, title });
  }

  function closeAllPopups() {
    setisAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard({});
    setinfotooltipOpen(false);
  }

  function handleUpdateUser(data) {
    loadButton(true);
    api
      .setUserInfo(data)
      .then((response) => {
        setcurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        loadButton(false);
      });
  }

  function handleUpdateAvatar(data) {
    loadButton(true);
    api
      .updateAvatar(data)
      .then((response) => {
        setcurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        loadButton(false);
      });
  }

  function handleAddPlaceSubmit(name, url) {
    loadButton(true);
    api
      .addNewCard(name, url)
      .then((data) => {
        console.log(data);
        const newCard = {
          name: data.name,
          link: data.link,
          likes: data.likes,
          id: data._id,
          owner: data.owner,
        };
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        loadButton(false);
      });
  }

  function loadButton(isLoading) {
    setSaveButton(isLoading);
  }

  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        setinfotooltipOpen(true);
        setRegResponse(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setinfotooltipOpen(true);
        setRegResponse(false);
      });
  }

  function handleLogin(email, password) {
    auth(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.JWT);
        setLoggedIn(true);
        setEmail(email);
        navigate('/');
      })
      .catch((err) => {
        setinfotooltipOpen(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function checkResponse() {
    if (localStorage.getItem('jwt')) {
      checkValidityToken(localStorage.getItem('jwt'))
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      navigate('/sign-in');
    }
  }

  function logOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          email={loggedIn ? email : ''}
          loggedIn={loggedIn}
          onClick={logOut}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  /*onCardDelete={handleCardDelete}*/
                  onCardDelete={handleDeleteCardClick}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path='/sign-in'
            element={<Login onLoginButton={handleLogin} />}
          />
          <Route
            path='/sign-up'
            element={<Register onRegButton={handleRegister} />}
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          saveButton={saveButton}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          saveButton={saveButton}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          saveButton={saveButton}
        />
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          saveButton={saveButton}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          regResponse={regResponse}
          isOpen={infotooltipOpen}
          onClose={closeAllPopups}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
