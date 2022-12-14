import React from 'react';
//export const BASE_URL = 'https://auth.nomoreparties.co';
//export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.volnotepov.students.nomoredomains.sbs';

//const JWT = localStorage.getItem('token');

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => checkResponse(response));
};

export const auth = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => checkResponse(response));
};

export const checkValidityToken = (JWT) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT}`,
    },
  }).then((response) => checkResponse(response));
};
