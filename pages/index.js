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
buttonCloseProfile.addEventListener('click', function() {closePopup(buttonCloseProfile);});
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
buttonClosePlace.addEventListener('click', function() {closePopup(buttonClosePlace);});
formAddPlace.addEventListener('submit', addNewPlace);

// popup gallery
const gallery = document.querySelector('.popup_type_gallery');
const buttonCloseGallery = gallery.querySelector('.button_type_close');
const galleryImage = gallery.querySelector('.popup__gallery-image');
const galleryName = gallery.querySelector('.popup__gallery-name');

buttonCloseGallery.addEventListener('click', function () {
  galleryImage.src ='#';
  galleryName.textContent = '';
  console.log(galleryImage.src + ' ' + galleryName.textContent);

  closePopup(this);
});

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
function closePopup (el){
  el.closest('.popup').classList.remove('popup_opened');
}

// сохранить данные профиля
function saveFormProfile (evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  aboutUser.textContent = formAboutUser.value;

  closePopup(this);
}

  //наполнение сайта карточкама place
//добавить на сайт новое место, в параметрах имя и ссылка (из массива или с формы)
function publicPlace(namePlace, linkPlace) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true); //скопировали эл-т div .place
  placeElement.querySelector('.place__name').textContent = namePlace;
  placeElement.querySelector('.place__image').src = linkPlace;
  placeElement.querySelector('.place__image').alt = namePlace;
  places.prepend(placeElement);

  placeElement.querySelector('.place__image').addEventListener('click', function (evt){
    galleryImage.src = evt.target.src;
    galleryName.textContent = evt.target.alt;

    openPopup (gallery);
  });

  document.querySelector('.place__trash-icon').addEventListener('click', deletePlace);
  document.querySelector('.place__like-icon').addEventListener('click', likePlace);
}


// опубликовать карточку, взяв данные из формы
function addNewPlace(evt){
  evt.preventDefault();
  const placeName = this.querySelector('#placeName').value;
  const placeLink = this.querySelector('#placeLink').value;
  publicPlace(placeName, placeLink);

  this.querySelector('#placeName').value = '';
  this.querySelector('#placeLink').value = '';

  closePopup(this);
};

//удаляем карточки
function deletePlace (){
  const cardPlace = this.closest('.place').remove();
}

// переключатель liked
function likePlace (evt) {
  evt.target.classList.toggle('liked');
}


