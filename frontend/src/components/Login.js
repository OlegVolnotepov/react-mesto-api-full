import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

function Login({ loggedIn, onLoginButton }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLoginButton(email, password);
  }
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          className="login__input"
          onChange={handleChangeEmail}
          type="email"
        />
        <span></span>
        <input
          type="password"
          placeholder="Пароль"
          className="login__input"
          onChange={handleChangePassword}
        />
        <span></span>
        <button className="login__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
