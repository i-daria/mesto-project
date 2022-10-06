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

  //добавление слушателя ESC
  window.addEventListener('keydown', escapePopup)

  //добавление слушателя на оверлэй
  popup.addEventListener('click', clickOverlayHandler);

  const form = popup.querySelector('.form');
  if (form) {
    //добавление слушателя на ввод символов
    form.addEventListener('input', validateInput);

    //переключаем состояние кнопки отправки формы
    toggleSubmitButton(form);
  }
}

  //проверка валидности всей формы
  function hasInputError (form) {
    const inputList = Array.from(form.querySelectorAll('.form__input'));
    return inputList.some(input => {
      return !input.validity.valid;
    });
  }

  //переключатель отображения кнопки отправки формы
  function toggleSubmitButton (form) {
    const submitButton = form.querySelector('.button_type_submit');
    if (hasInputError(form)) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

//валидация поля ввода
function validateInput (evt) {
  const error = document.querySelector(`.${evt.target.id}-error`);
  if(!evt.target.validity.valid) {
    showErrorMessage(error, evt.target)
  } else {
    hideErrorMessage(error);
  }
  toggleSubmitButton(evt.target.closest('.form'));
}

//показать сообщение об ошибке для невалидного поля
function showErrorMessage (error, input) {
  error.style.visibility = "visible";
    if (input.validity.patternMismatch){
      error.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.";
    } else {
      error.textContent = input.validationMessage;
    }
}

//скрыть сообщение об ошибке для невалидного поля
function hideErrorMessage (error) {
  error.style.visibility = "hidden";
}

// закрыть popup
function closePopup(element) {
  const popup =  element.closest(".popup");
  popup.classList.remove("popup_opened");
  closeAllError(popup);
}

// скрыть все сообщения об ошибках при закрытии попапа
function closeAllError (popup) {
  const errorList = Array.from(popup.querySelectorAll('.form__input-error'));
  errorList.forEach(error => {
    hideErrorMessage(error);
  });
}

// сохранить данные профиля
function saveFormProfile(evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  userAbout.textContent = formAboutUser.value;

  closePopup(this);
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
