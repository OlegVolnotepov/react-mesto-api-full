class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(name, url) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: url,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  unSetLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '62838c5f-4a61-4c03-9d7e-35ad7fdce1d3',
    'Content-Type': 'application/json',
  },
});

export default api;
