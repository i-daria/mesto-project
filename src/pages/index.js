import './index.css';

import {buttonEditProfile, popupProfile, formEditProfile, buttonCloseProfile, buttonAddPlace,
  popupNewPlace, formAddPlace, buttonClosePlace, buttonCloseGallery, galleryImage, galleryName, validationSettings} from '../components/utils.js';

import {openPopup, closePopup, saveFormProfile, } from '../components/modal.js';

import {addCard} from '../components/card.js';
import {enableValidation} from '../components/validate';

// добавить место по данным формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  const placeName = evt.target.querySelector("#placeName").value;
  const placeLink = evt.target.querySelector("#placeLink").value;
  addCard(placeName, placeLink);

  closePopup(evt.target.closest(".popup"));
}

buttonEditProfile.addEventListener("click", function () {
  openPopup(popupProfile);
});
buttonCloseProfile.addEventListener("click", function () {
  closePopup(buttonCloseProfile.closest(".popup"));
});
formEditProfile.addEventListener("submit", saveFormProfile);
buttonAddPlace.addEventListener("click", function () {
  openPopup(popupNewPlace);
});
buttonClosePlace.addEventListener("click", function () {
  closePopup(buttonClosePlace.closest(".popup"));
});
formAddPlace.addEventListener("submit", submitAddCardForm);
buttonCloseGallery.addEventListener("click", function (evt) {
  galleryImage.src = "#";
  galleryName.textContent = "";
  closePopup(evt.target.closest(".popup"));
});

enableValidation(validationSettings);






