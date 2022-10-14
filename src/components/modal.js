import {formUserName, formAboutUser, userName, userAbout, formAddPlace, validationSettings} from './utils.js';
import {closeAllError, toggleSubmitButton} from './validate.js';


// открыть popup, для формы профиля подставить данные со страницы
function openPopup(popup) {
  popup.classList.add("popup_opened");

  //добавление слушателя ESC
  document.addEventListener('keydown', escapePopup)

  //добавление слушателя на оверлэй
  popup.addEventListener('click', clickOverlayHandler);
}

//открыть попап править информацию профиля
function openPopupEditProfile (popup) {
  openPopup(popup);
  popupProfileHandler(popup);
  toggleSubmitButton(popup.querySelector('.form'));
}

//открыть попап добавить карточку места
function openPopupAddCard (popup) {
  openPopup(popup);
  popupNewPlaceHandler(popup);
  toggleSubmitButton(popup.querySelector('.form'));
}

//заполнить данными popup профиля при открытии
function popupProfileHandler (popup) {
    closeAllError(popup);
    formUserName.value = userName.textContent;
    formAboutUser.value = userAbout.textContent;
}

//очистить форму popup добавление места при открытии
function popupNewPlaceHandler (popup) {
  closeAllError(popup);
  formAddPlace.reset();
}

// закрыть popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', escapePopup);
  popup.removeEventListener('click', clickOverlayHandler);
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

//открыть попап аватар
function avatarClickHandler (popup) {
  openPopup(popup);
  closeAllError(popup);
  const form = popup.querySelector('.form');
  form.reset();
  toggleSubmitButton(form);
};


//переключатель текста кнопки Сохранить -> Сохранение...
function renderLoading (button, buttonValue, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = buttonValue;
  }
}

export {openPopup, openPopupEditProfile, openPopupAddCard, closePopup, escapePopup, clickOverlayHandler, avatarClickHandler, renderLoading};
