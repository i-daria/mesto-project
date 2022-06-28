// popup

const buttonEditProfile = document.querySelector('.button_type_edit');
const popupProfile = document.querySelector('.popup-profile');
const formEditProfile = popupProfile.querySelector('form[name="formEditProfile"]');
let userName = formEditProfile.querySelector('#userName');
let aboutUser = formEditProfile.querySelector('#aboutUser');
const buttonSaveProfile = formEditProfile.querySelector('button[type="submit"]');
const buttonCloseProfile = formEditProfile.querySelector('button[type="reset"]');

buttonEditProfile.addEventListener('click', function(){openPopup(popupProfile)});
buttonCloseProfile.addEventListener('click', closePopup);


const buttonAddPlace = document.querySelector('.button_type_add');
const popupNewPlace = document.querySelector('.popup-new-place');
const formAddPlace = document.querySelector('form[name="formAddPlace"]');
let placeName = formAddPlace.querySelector('#placeName');
let placeLink = formAddPlace.querySelector('#placeLink');
const buttonSavePlace = formAddPlace.querySelector('button[type="submit"]');
const buttonClosePlace = formAddPlace.querySelector('button[type="reset"]');

buttonAddPlace.addEventListener('click', function(){openPopup(popupNewPlace)});
buttonClosePlace.addEventListener('click', closePopup);


// открывает popup, в колбеке addEventListener передать параметр - эл-т popup
function openPopup(popup){
  popup.classList.add('popup_opened');
};

// закрывает popup
function closePopup (){
  this.closest('.popup').classList.remove('popup_opened');
}

// save form

formEditProfile.addEventListener('submit', saveForm);

function saveForm (evt) {
  evt.preventDefault();


// Получите значение полей jobInput и nameInput из свойства value



// Выберите элементы, куда должны быть вставлены значения полей



// Вставьте новые значения с помощью textContent

}





// and close

