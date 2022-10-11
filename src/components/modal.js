import {popupProfile, formUserName, formAboutUser, userName, userAbout, popupNewPlace, formAddPlace, validationSettings} from './utils.js';
import {closeAllError, isValid, toggleSubmitButton, setEventListeners} from './validate.js';


// открыть popup, для формы профиля подставить данные со страницы
function openPopup(popup) {
  popup.classList.add("popup_opened");

  //добавление слушателя ESC
  document.addEventListener('keydown', escapePopup)

  //добавление слушателя на оверлэй
  popup.addEventListener('click', clickOverlayHandler);

  if (popup === popupProfile) {
    popupProfileHandler(popup);
  }

  if (popup === popupNewPlace) {
    popupNewPlaceHandler(popup);
  }
}

//заполнить данными popup профиля при открытии
function popupProfileHandler (popup) {
    closeAllError(popup);
    formUserName.value = userName.textContent;
    formAboutUser.value = userAbout.textContent;

    setEventListeners(popup.querySelector('.form'));
}

//очистить форму popup добавление места при открытии
function popupNewPlaceHandler (popup) {
  closeAllError(popup);
  setEventListeners(popup.querySelector('.form'));
  formAddPlace.reset();
}

// закрыть popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', escapePopup);
  popup.removeEventListener('click', clickOverlayHandler);
}

// сохранить данные профиля
function saveFormProfile(evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  userAbout.textContent = formAboutUser.value;

  closePopup(evt.target.closest(".popup"));
}

// закрытие попапа по ESC
function escapePopup (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// закрытие попапа по клику на оверлэй
function clickOverlayHandler (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export {openPopup, closePopup, saveFormProfile, escapePopup, clickOverlayHandler};
