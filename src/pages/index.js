import './index.css';

import {avatarContainer, popupAvatar, buttonCloseAvatar, formAvatar, userName, userAbout, buttonEditProfile, formEditProfile, buttonCloseProfile, popupProfile, buttonAddPlace,
  popupNewPlace, formAddPlace, buttonClosePlace, buttonCloseGallery, galleryImage, galleryName, validationSettings, avatar, formUserName, formAboutUser, places} from '../components/utils.js';
import {avatarClickHandler, openPopupAddCard, openPopupEditProfile, closePopup, renderLoading} from '../components/modal.js';
import {createCard, submitAddCardForm} from '../components/card.js';
import {enableValidation} from '../components/validate';
import {getUserProfile, getCards, avatarSubmitHandler, saveProfileHandler} from '../components/api.js';

//слушатель на клик по аватару
avatarContainer.addEventListener('click', function () {
  avatarClickHandler(popupAvatar);
});

//слушатель закрытия аватара по кнопке крестик
buttonCloseAvatar.addEventListener('click', function () {
  closePopup(popupAvatar);
});

//слушатель отправки данных формы аватар
formAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const buttonSubmit = evt.target.querySelector('.button_type_submit');
  renderLoading(buttonSubmit, 'Cохранить', true);
  const avatarLink = evt.target.querySelector("#avatarLink").value;
  avatarSubmitHandler(avatarLink)
  .then(res => avatar.setAttribute('src', res.avatar))
  .then(res => closePopup(popupAvatar))
  .catch((err) => console.log(err))
  .finally(res => renderLoading(buttonSubmit, 'Cохранить', false));
});

buttonEditProfile.addEventListener("click", function () {
  openPopupEditProfile(popupProfile);
});

buttonCloseProfile.addEventListener("click", function () {
  closePopup(buttonCloseProfile.closest(".popup"));
});

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const buttonSubmit = evt.target.querySelector('.button_type_submit');
  renderLoading(buttonSubmit, 'Cохранить', true);
  saveProfileHandler(formUserName.value, formAboutUser.value)
  .then(res => {
    userName.textContent = res.name;
    userAbout.textContent = res.about;
  })
  .then(res => closePopup(popupProfile))
  .catch((err) => console.log(err))
  .finally(res => renderLoading(buttonSubmit, 'Cохранить', false));
});

buttonAddPlace.addEventListener("click", function () {
  openPopupAddCard(popupNewPlace);
});

buttonClosePlace.addEventListener("click", function () {
  closePopup(buttonClosePlace.closest(".popup"));
});

formAddPlace.addEventListener("submit", submitAddCardForm);
buttonCloseGallery.addEventListener("click", function (evt) {
  galleryImage.src = "#";
  galleryName.textContent = "";
  closePopup(evt.target.closest(".popup"));
});

enableValidation(validationSettings);

Promise.all([getUserProfile(), getCards()])
.then((res) =>{
    userName.textContent = res[0].name;
    userAbout.textContent = res[0].about;
    avatar.setAttribute('src', res[0].avatar);
    const myId = res[0]._id;
    res[1].forEach(element => {
      places.append(createCard(element.name, element.link, element.likes, element.owner._id, myId, element._id));
    });
})
.catch((err) => console.log(err));

