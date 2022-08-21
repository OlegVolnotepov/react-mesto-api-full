import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../utils/Auth';

function Register({ onRegButton }) {
  // const [formData, setFormData] = React.useState({
  //   email: '',
  //   password: '',
  // });

  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setFormData((oldData) => ({
  //     ...oldData,
  //     [name]: value,
  //   }));
  // }
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
    onRegButton(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          className="login__input"
          required
          name="email"
          onChange={handleChangeEmail}
        />
        <span></span>
        <input
          placeholder="Пароль"
          type="password"
          className="login__input"
          name="password"
          onChange={handleChangePassword}
          required
        />
        <span></span>
        <button className="login__submit" type="submit">
          Зарегистрироваться
        </button>
        <div className="login__wrapper">
          <p className="login__text">Уже зарегестрированы?&nbsp;</p>
          <Link className="login__link" to="/sign-in">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
