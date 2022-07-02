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
const formEditProfile = popupProfile.querySelector(
  'form[name="formEditProfile"]'
);
const formUserName = formEditProfile.querySelector("#userName");
const formAboutUser = formEditProfile.querySelector("#aboutUser");
const buttonCloseProfile = formEditProfile.querySelector(
  'button[type="reset"]'
);

// popup place
const buttonAddPlace = document.querySelector(".button_type_add");
const popupNewPlace = document.querySelector(".popup-new-place");
const formAddPlace = document.querySelector('form[name="formAddPlace"]');
const buttonClosePlace = formAddPlace.querySelector('button[type="reset"]');
const placeName = document.querySelector("#placeName");
const placeLink = document.querySelector("#placeLink");

//шаблон place
const placesContainer = document.querySelector(".places"); // куда вставлять
const placeTemplate = document.querySelector("#place").content; // содержимое шаблона

// popup gallery
const gallery = document.querySelector(".popup_type_gallery");
const buttonCloseGallery = gallery.querySelector(".button_type_close");
const galleryImage = gallery.querySelector(".popup__gallery-image");
const galleryName = gallery.querySelector(".popup__gallery-name");

// вставить 6 мест при загрузке страницы из массива initialCards
initialCards.forEach(function (card) {
  renderPlace(card.name, card.link);
});

// открыть popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// открыть popup profile
function openPropfilePopup() {
  formUserName.value = userName.textContent;
  formAboutUser.value = userAbout.textContent;

  openPopup(popupProfile);
  }

// закрыть popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// сохранить данные профиля
function saveFormProfile(evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  userAbout.textContent = formAboutUser.value;

  closePopup(popupProfile);
}

//добавить место, на входе данные из массива или с формы
function createPlace(namePlace, linkPlace) {
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //скопировали эл-т div .place
  const placeImage = placeElement.querySelector(".place__image");
  placeElement.querySelector(".place__name").textContent = namePlace;
  placeImage.src = linkPlace;
  placeImage.alt = namePlace;

  placeImage.addEventListener("click", function () {
      galleryImage.src = linkPlace;
      galleryImage.alt = namePlace;
      galleryName.textContent = namePlace;

      openPopup(gallery);
    });

  placeElement.querySelector(".place__trash-icon").addEventListener("click", deletePlace);
  placeElement.querySelector(".place__like-icon").addEventListener("click", likePlace);

  return placeElement;
}

// добавить место по данным формы
function addNewPlace(evt) {
  evt.preventDefault();
  renderPlace(placeName.value, placeLink.value);

  formAddPlace.reset();

  closePopup(popupNewPlace);
}

// опубликовать new place
function renderPlace (namePlace, linkPlace) {
  const element = createPlace(namePlace, linkPlace);
  placesContainer.prepend(element);
}

//удалить карточку место
function deletePlace(evt) {
  evt.target.closest(".place").remove();
}

// переключатель нравится / не нравится
function likePlace(evt) {
  evt.target.classList.toggle("liked");
}

buttonEditProfile.addEventListener("click", openPropfilePopup);
buttonCloseProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});
formEditProfile.addEventListener("submit", saveFormProfile);

buttonAddPlace.addEventListener("click", function () {
  openPopup(popupNewPlace);
});
buttonClosePlace.addEventListener("click", function () {
  closePopup(popupNewPlace);
});
formAddPlace.addEventListener("submit", addNewPlace);

buttonCloseGallery.addEventListener("click", function () {
  closePopup(gallery);
});
