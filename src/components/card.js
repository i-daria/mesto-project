import {initialCards, places, placeTemplate, gallery, galleryImage, galleryName} from './utils.js'
import {openPopup} from './modal.js';

// вставить 6 мест при загрузке страницы из массива initialCards
initialCards.forEach(function (card) {
  addCard(card.name, card.link);
});

//добавления карточки места в DOM
function addCard (namePlace, linkPlace) {
  const placeElement = createCard(namePlace, linkPlace);
  places.prepend(placeElement);
  setPlaceEventListeners (placeElement, namePlace, linkPlace);
}

//создать карточку места по данным массива или формы
function createCard(namePlace, linkPlace) {
  const placeElement = getCardTemplate();
  const placeElementImage = placeElement.querySelector(".place__image");
  placeElement.querySelector(".place__name").textContent = namePlace;
  placeElementImage.src = linkPlace;
  placeElementImage.alt = namePlace;

  return placeElement;
}

//создать шаблон карточки места
function getCardTemplate () {
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //скопировали эл-т div .place
  return placeElement;
}

//добавить новой карточке места слушатели
function setPlaceEventListeners (placeElement, namePlace, linkPlace) {
  placeElement.querySelector(".place__image").addEventListener("click", function () {
    galleryImage.src = linkPlace;
    galleryImage.alt = linkPlace;
    galleryName.textContent = namePlace;

    openPopup(gallery);
  });

  placeElement.querySelector(".place__trash-icon").addEventListener("click", deletePlace);
  placeElement.querySelector(".place__like-icon").addEventListener("click", likePlace);
}

//удалить карточку место
function deletePlace(evt) {
  const cardPlace = evt.target.closest(".place").remove();
}

// переключатель нравится / не нравится
function likePlace(evt) {
  evt.target.classList.toggle("liked");
}

export {addCard, deletePlace, likePlace};
