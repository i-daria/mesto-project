const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];


// popup profile
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__profession');
const buttonEditProfile = document.querySelector('.button_type_edit');
const popupProfile = document.querySelector('.popup-profile');
const formEditProfile = popupProfile.querySelector('form[name="formEditProfile"]');
const formUserName = formEditProfile.querySelector('#userName');
const formAboutUser = formEditProfile.querySelector('#aboutUser');
const buttonCloseProfile = formEditProfile.querySelector('button[type="reset"]');

buttonEditProfile.addEventListener('click', function(){openPopup(popupProfile)});
buttonCloseProfile.addEventListener('click', closePopup);
formEditProfile.addEventListener('submit', saveFormProfile);

// popup place
const buttonAddPlace = document.querySelector('.button_type_add');
const popupNewPlace = document.querySelector('.popup-new-place');
const formAddPlace = document.querySelector('form[name="formAddPlace"]');
const buttonClosePlace = formAddPlace.querySelector('button[type="reset"]');

//скопируем и наполним шаблон place
const places = document.querySelector('.places'); // куда вставлять
const placeTemplate = document.querySelector('#place').content; // содержимое шаблона







buttonAddPlace.addEventListener('click', function(){openPopup(popupNewPlace)});
buttonClosePlace.addEventListener('click', closePopup);
formAddPlace.addEventListener('submit', addNewPlace);

  // вставить 6 мест при загрузке страницы из массива initialCards
  initialCards.forEach(function (card) {
    publicPlace (card.name, card.link);
  });

// открывает popup, в колбеке addEventListener передать параметр - эл-т popup
function openPopup(popup){
  popup.classList.add('popup_opened');
  if (popup === popupProfile) {
    formUserName.value = userName.textContent;
    formAboutUser.value = aboutUser.textContent;
  }
};

// закрывает popup
function closePopup (){
  this.closest('.popup').classList.remove('popup_opened');
}

// сохранить данные профиля
function saveFormProfile (evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  aboutUser.textContent = formAboutUser.value;

  this.closest('.popup').classList.remove('popup_opened');

}

  //наполнение сайта карточкама place
//добавить на сайт новое место, в параметрах имя и ссылка (из массива или с формы)
function publicPlace(namePlace, linkPlace) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true); //скопировали эл-т div .place
  placeElement.querySelector('.place__name').textContent = namePlace;
  placeElement.querySelector('.place__image').src = linkPlace;
  places.prepend(placeElement);

  document.querySelector('.place__trash-icon').addEventListener('click', deletePlace);
}

  // вставить 6 мест при загрузке страницы из массива initialCards
  initialCards.forEach(function (card) {
    publicPlace (card.name, card.link);
  });

// опубликовать карточку, взяв данные из формы
function addNewPlace(evt){
  evt.preventDefault();
  const placeName = this.querySelector('#placeName').value;
  const placeLink = this.querySelector('#placeLink').value;
  publicPlace(placeName, placeLink);

  this.querySelector('#placeName').value = '';
  this.querySelector('#placeLink').value = '';

  this.closest('.popup').classList.remove('popup_opened');
};

//удаляем карточки
function deletePlace (){
  const cardPlace = this.closest('.place').remove();
}




  // toggle liked


// попап с картинкой

