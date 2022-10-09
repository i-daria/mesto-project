import './pages/index.css';

import {initialCards, userName, userAbout, buttonEditProfile, popupProfile, formEditProfile, formUserName, formAboutUser, buttonCloseProfile, buttonAddPlace,
  popupNewPlace, formAddPlace, buttonClosePlace, places, placeTemplate, gallery, buttonCloseGallery, galleryImage, galleryName} from './components/utils.js';

import {openPopup, closePopup, saveFormProfile, escapePopup, clickOverlayHandler} from './components/modal.js';

import {hasInputError, toggleSubmitButton, enableValidation, showErrorMessage, hideErrorMessage, closeAllError} from './components/validate.js';

import {publicPlace, addNewPlace, deletePlace, likePlace} from './components/card.js';

buttonEditProfile.addEventListener("click", function () {
  openPopup(popupProfile);
});
buttonCloseProfile.addEventListener("click", function () {
  closePopup(buttonCloseProfile);
});
formEditProfile.addEventListener("submit", saveFormProfile);

buttonAddPlace.addEventListener("click", function () {
  openPopup(popupNewPlace);
});
buttonClosePlace.addEventListener("click", function () {
  closePopup(buttonClosePlace);
});
formAddPlace.addEventListener("submit", addNewPlace);

buttonCloseGallery.addEventListener("click", function (evt) {
  galleryImage.src = "#";
  galleryName.textContent = "";
  closePopup(evt.target);
});






