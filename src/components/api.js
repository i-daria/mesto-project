import {renderLoading} from './modal.js';
import {config, userName, userAbout, avatar} from './utils.js';
import {addCard} from './card.js';

//получить данные пользователя с сервера
function getUserProfile () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => console.log(err));
}

//обновить аватар с отправкой на сервер
function avatarSubmitHandler (link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: `${link}`
    }),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    avatar.setAttribute('src', res.avatar);
  });
}

//обновить данные пользователя
function saveProfileHandler(name, about) {
 return fetch (`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  body: JSON.stringify({
    name: `${name}`,
    about: `${about}`
  }),
  headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    userName.textContent = res.name;
    userAbout.textContent = res.about;
  });
}

//получать карточки места с сервера
function getCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => console.log(err));
}

//добавить новую карточку места на сервер
function sendCard(namePlace, linkPlace) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: `${namePlace}`,
      link: `${linkPlace}`
    }),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    addCard(res.name, res.link, res.likes, res.owner._id, res.owner._id, res._id);
  });
}

//удалить карточку место
function deletePlace(placeId, placeElement) {
  return fetch(`${config.baseUrl}/cards/${placeId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => placeElement.remove());
}

// переключатель нравится / не нравится
function changeLikePlaceStatus(method, cardId, likeCount) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then (res => {
    likeCount.textContent = res.likes.length;
  });
}

export {getUserProfile, getCards, avatarSubmitHandler, saveProfileHandler, sendCard, deletePlace, changeLikePlaceStatus};
