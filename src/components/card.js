import {places, placeTemplate, gallery, galleryImage, galleryName, popupNewPlace} from './utils.js'
import {openPopup, closePopup, renderLoading} from './modal.js';
import {sendCard, deletePlace, changeLikePlaceStatus} from './api.js';

//добавления карточки места в DOM
function addCard (namePlace, linkPlace, likesPlace, ownerId, myId, placeId) {
  const placeElement = createCard(namePlace, linkPlace, likesPlace, ownerId, myId, placeId);
  places.prepend(placeElement);
}

//создать карточку места по данным массива или формы
function createCard(namePlace, linkPlace, likesPlace = [], ownerId, myId, placeId) {
  const placeElement = getCardTemplate();
  const placeElementImage = placeElement.querySelector(".place__image");
  const likeIcon = placeElement.querySelector(".place__like-icon");
  const likeCount = placeElement.querySelector('.place__like-count');
  placeElement.querySelector(".place__name").textContent = namePlace;
  placeElementImage.src = linkPlace;
  placeElementImage.alt = namePlace;
  likeCount.textContent = likesPlace.length;

  likesPlace.forEach(like => {
    if (like._id === myId) {
      likeIcon.classList.add("liked");
    }
  });

  if (ownerId !== myId) {
    placeElement.querySelector('.place__trash-icon').style.display = 'none';
  }
  setPlaceEventListeners (placeElement, namePlace, linkPlace, placeId);

  return placeElement;
}

//создать шаблон карточки места
function getCardTemplate () {
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //скопировали эл-т div .place
  return placeElement;
}

//добавить новой карточке места слушатели
function setPlaceEventListeners (placeElement, namePlace, linkPlace, placeId) {
  placeElement.querySelector(".place__image").addEventListener("click", function () {
    galleryImage.src = linkPlace;
    galleryImage.alt = linkPlace;
    galleryName.textContent = namePlace;

    openPopup(gallery);
  });

  placeElement.querySelector(".place__trash-icon").addEventListener("click", function () {
    deletePlace (placeId, placeElement);
  });
  placeElement.querySelector(".place__like-icon").addEventListener("click", function (evt) {
    const likeCount = placeElement.querySelector('.place__like-count');
    likePlaceHandler(evt.target, placeId, likeCount);
    evt.target.classList.toggle("liked");
  });
}

//переключатель лайков карточки места
function likePlaceHandler (like, placeId, likeCount) {
  if (like.classList.contains('liked')){
    changeLikePlaceStatus('DELETE', placeId, likeCount);
  } else {
    changeLikePlaceStatus('PUT', placeId, likeCount);
  }
}

// добавить место на сайт по данным формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.target.querySelector('.button_type_submit');
  renderLoading(buttonSubmit, 'Cохранить', true);
  const placeName = evt.target.querySelector("#placeName").value;
  const placeLink = evt.target.querySelector("#placeLink").value;
  sendCard(placeName, placeLink).then(res => renderLoading(buttonSubmit, 'Cохранить', false)).then(res => closePopup(popupNewPlace));
}

export {addCard, createCard, changeLikePlaceStatus, submitAddCardForm};
