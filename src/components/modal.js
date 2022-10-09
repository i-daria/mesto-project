import {popupProfile, formUserName, formAboutUser, userName, userAbout, popupNewPlace, formAddPlace} from './utils.js';
import {closeAllError, enableValidation, toggleSubmitButton} from './validate.js';

// открыть popup, для формы профиля подставить данные со страницы
function openPopup(popup) {
  popup.classList.add("popup_opened");
  if (popup === popupProfile) {
    formUserName.value = userName.textContent;
    formAboutUser.value = userAbout.textContent;
  }

  if (popup === popupNewPlace) {
    formAddPlace.reset();
  }

  //добавление слушателя ESC
  document.addEventListener('keydown', escapePopup)

  //добавление слушателя на оверлэй
  popup.addEventListener('click', clickOverlayHandler);

  const form = popup.querySelector('.form');
  if (form) {
    //добавление слушателя на ввод символов
    form.addEventListener('input', enableValidation);

    //переключаем состояние кнопки отправки формы
    toggleSubmitButton(form);
  }
}

// закрыть popup
function closePopup(element) {
  const popup =  element.closest(".popup");
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', escapePopup);
  closeAllError(popup);
}

// сохранить данные профиля
function saveFormProfile(evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  userAbout.textContent = formAboutUser.value;

  closePopup(evt.target);
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
