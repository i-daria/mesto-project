//popup avatar
const avatarContainer = document.querySelector(".profile__avatar-container");
const avatar = document.querySelector(".profile__avatar");
const popupAvatar = document.querySelector(".popup-avatar");
const formAvatar = popupAvatar.querySelector('form[name="formEditAvatar"]');
const buttonCloseAvatar = popupAvatar.querySelector('button[type="reset"]');

// popup profile
const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__profession");
const buttonEditProfile = document.querySelector(".button_type_edit");
const popupProfile = document.querySelector(".popup-profile");
const formEditProfile = popupProfile.querySelector('form[name="formEditProfile"]');
const formUserName = formEditProfile.querySelector("#userName");
const formAboutUser = formEditProfile.querySelector("#aboutUser");
const buttonCloseProfile = formEditProfile.querySelector('button[type="reset"]');

// popup place
const buttonAddPlace = document.querySelector(".button_type_add");
const popupNewPlace = document.querySelector(".popup-new-place");
const formAddPlace = document.querySelector('form[name="formAddPlace"]');
const buttonClosePlace = formAddPlace.querySelector('button[type="reset"]');

//шаблон place
const places = document.querySelector(".places"); // куда вставлять
const placeTemplate = document.querySelector("#place").content; // содержимое шаблона

// popup gallery
const gallery = document.querySelector(".popup_type_gallery");
const buttonCloseGallery = gallery.querySelector(".button_type_close");
const galleryImage = gallery.querySelector(".popup__gallery-image");
const galleryName = gallery.querySelector(".popup__gallery-name");

//параметры валидации форм
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelecor: '.button_type_submit',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

//настройки для работы с сервером
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '1e84654b-bbe2-47d6-b9a3-df2413007526',
    'Content-Type': 'application/json',
  }
}

export {config, avatarContainer, avatar, popupAvatar, formAvatar, buttonCloseAvatar, userName, userAbout, buttonEditProfile, popupProfile, formEditProfile, formUserName, formAboutUser, buttonCloseProfile, buttonAddPlace,
  popupNewPlace, formAddPlace, buttonClosePlace, places, placeTemplate, gallery, buttonCloseGallery, galleryImage, galleryName, validationSettings};
