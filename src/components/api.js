import {config} from './utils.js';

//получить данные пользователя с сервера
function getUserProfile () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
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
  .then(res => getResponseData(res));
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
  .then(res => getResponseData(res));
}

//получать карточки места с сервера
function getCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
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
  .then(res => getResponseData(res));
}

//удалить карточку место
function deletePlace(placeId, placeElement) {
  return fetch(`${config.baseUrl}/cards/${placeId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

// переключатель нравится / не нравится
function changeLikePlaceStatus(method, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
  .then(res => getResponseData(res));
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {getUserProfile, getCards, avatarSubmitHandler, saveProfileHandler, sendCard, deletePlace, changeLikePlaceStatus};
