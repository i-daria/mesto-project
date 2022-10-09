import {initialCards, places, placeTemplate, gallery, galleryImage, galleryName} from './utils.js'
import {openPopup, closePopup} from './modal.js';

// вставить 6 мест при загрузке страницы из массива initialCards
initialCards.forEach(function (card) {
  publicPlace(card.name, card.link);
});

//добавить место, на входе данные из массива или с формы
function publicPlace(namePlace, linkPlace) {
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //скопировали эл-т div .place
  placeElement.querySelector(".place__name").textContent = namePlace;
  placeElement.querySelector(".place__image").src = linkPlace;
  placeElement.querySelector(".place__image").alt = namePlace;
  places.prepend(placeElement);

  placeElement.querySelector(".place__image").addEventListener("click", function () {
      galleryImage.src = linkPlace;
      galleryName.textContent = namePlace;

      openPopup(gallery);
    });

  document.querySelector(".place__trash-icon").addEventListener("click", deletePlace);
  document.querySelector(".place__like-icon").addEventListener("click", likePlace);
}

// добавить место по данным формы
function addNewPlace(evt) {
  evt.preventDefault();
  const placeName = evt.target.querySelector("#placeName").value;
  const placeLink = evt.target.querySelector("#placeLink").value;
  publicPlace(placeName, placeLink);

  closePopup(evt.target);
}

//удалить карточку место
function deletePlace(evt) {
  const cardPlace = evt.target.closest(".place").remove();
}

// переключатель нравится / не нравится
function likePlace(evt) {
  evt.target.classList.toggle("liked");
}

export {publicPlace, addNewPlace, deletePlace, likePlace};
