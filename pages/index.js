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

//шаблон place
const places = document.querySelector(".places"); // куда вставлять
const placeTemplate = document.querySelector("#place").content; // содержимое шаблона

// popup gallery
const gallery = document.querySelector(".popup_type_gallery");
const buttonCloseGallery = gallery.querySelector(".button_type_close");
const galleryImage = gallery.querySelector(".popup__gallery-image");
const galleryName = gallery.querySelector(".popup__gallery-name");

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

buttonCloseGallery.addEventListener("click", function () {
  galleryImage.src = "#";
  galleryName.textContent = "";
  closePopup(this);
});

// вставить 6 мест при загрузке страницы из массива initialCards
initialCards.forEach(function (card) {
  publicPlace(card.name, card.link);
});

// открыть popup, для формы профиля подставить данные со страницы
function openPopup(popup) {
  popup.classList.add("popup_opened");
  if (popup === popupProfile) {
    formUserName.value = userName.textContent;
    formAboutUser.value = userAbout.textContent;
  }
}

// закрыть popup
function closePopup(element) {
  element.closest(".popup").classList.remove("popup_opened");
}

// сохранить данные профиля
function saveFormProfile(evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  userAbout.textContent = formAboutUser.value;

  closePopup(this);
}

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
  const placeName = this.querySelector("#placeName").value;
  const placeLink = this.querySelector("#placeLink").value;
  publicPlace(placeName, placeLink);

  this.querySelector("#placeName").value = "";
  this.querySelector("#placeLink").value = "";

  closePopup(this);
}

//удалить карточку место
function deletePlace() {
  const cardPlace = this.closest(".place").remove();
}

// переключатель нравится / не нравится
function likePlace(evt) {
  evt.target.classList.toggle("liked");
}
