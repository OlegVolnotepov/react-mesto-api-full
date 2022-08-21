import React from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import menuIcon from '../images/menu-mobile.png';
import logoPath from '../images/logo.svg';
import closeIcon from '../images/closeicon.svg';

function Header({ email, loggedIn, onClick }) {
  const location = useLocation();
  const [openedMenu, setOpenedMenu] = React.useState(false);

  function handlerClick() {
    setOpenedMenu(!openedMenu);
  }

  return (
    <header className={openedMenu ? 'header header_open' : 'header'}>
      <div
        className={
          openedMenu
            ? 'header__opened-menu header__opened-menu_open'
            : 'header__opened-menu'
        }
      >
        <p className="header__text_mobile">{email}</p>
        {loggedIn && (
          <button className="header__button_mobile" onClick={onClick}>
            Выйти
          </button>
        )}
      </div>
      <div className="header__wrapper">
        <img src={logoPath} alt="логотип." className="header__logo" />
        <div className="header__login-wrapper">
          <p className="header__text">{email}</p>
          <Routes>
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              }
            />
            ;
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              }
            />
            ;
          </Routes>

          {loggedIn && (
            <button className="header__button" onClick={onClick}>
              Выйти
            </button>
          )}
          {loggedIn && (
            <button className="header__menu-button" onClick={handlerClick}>
              <img
                src={openedMenu ? closeIcon : menuIcon}
                alt="иконка меню"
              ></img>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
