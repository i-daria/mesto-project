
// popup
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__profession');
const buttonEditProfile = document.querySelector('.button_type_edit');
const popupProfile = document.querySelector('.popup-profile');
const formEditProfile = popupProfile.querySelector('form[name="formEditProfile"]');
const formUserName = formEditProfile.querySelector('#userName');
const formAboutUser = formEditProfile.querySelector('#aboutUser');
const buttonSaveProfile = formEditProfile.querySelector('button[type="submit"]');
const buttonCloseProfile = formEditProfile.querySelector('button[type="reset"]');

buttonEditProfile.addEventListener('click', function(){openPopup(popupProfile)});
buttonCloseProfile.addEventListener('click', closePopup);


const buttonAddPlace = document.querySelector('.button_type_add');
const popupNewPlace = document.querySelector('.popup-new-place');
const formAddPlace = document.querySelector('form[name="formAddPlace"]');
const placeName = formAddPlace.querySelector('#placeName');
const placeLink = formAddPlace.querySelector('#placeLink');
const buttonSavePlace = formAddPlace.querySelector('button[type="submit"]');
const buttonClosePlace = formAddPlace.querySelector('button[type="reset"]');

buttonAddPlace.addEventListener('click', function(){openPopup(popupNewPlace)});
buttonClosePlace.addEventListener('click', closePopup);


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

// сохранить данные
formEditProfile.addEventListener('submit', saveForm);

function saveForm (evt) {
  evt.preventDefault();

  userName.textContent = formUserName.value;
  aboutUser.textContent = formAboutUser.value;

  this.closest('.popup').classList.remove('popup_opened'); //не получается вызвать функцию this.closePopup() ???
}

//наполнение сайта карточкама place

//скопируем и наполним шаблон place
const places = document.querySelector('.places'); // куда вставлять
const placeTemplate = document.querySelector('#place').content; // содержимое шаблона

//вот это надо делать в цикле для вставки первых 6 и вызывать функцию 1р при добавлении нового места
function publicPlace(namePlace, linkPlace) {
  console.log('name: ' + namePlace);
  console.log('link: ' + linkPlace);
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true); //скопировали эл-т div .place
  placeElement.querySelector('.place__name').textContent = namePlace;
  placeElement.querySelector('.place__image').src = linkPlace;
  places.prepend(placeElement);
}

//добавить место
formAddPlace.addEventListener('submit', addNewPlace);

function addNewPlace(evt){
  evt.preventDefault();


};

// вставка 6 мест по шаблону при загрузке страницы
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

  initialCards.forEach(function (card) {
    publicPlace (card.name, card.link);
  });



  //удаление места


  // toggle liked


// попап с картинкой

