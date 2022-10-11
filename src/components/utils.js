const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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



export {initialCards, userName, userAbout, buttonEditProfile, popupProfile, formEditProfile, formUserName, formAboutUser, buttonCloseProfile, buttonAddPlace,
  popupNewPlace, formAddPlace, buttonClosePlace, places, placeTemplate, gallery, buttonCloseGallery, galleryImage, galleryName, validationSettings};
