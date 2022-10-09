//валидация поля ввода
function enableValidation (evt) {
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
    error.textContent = input.dataset.errorMessage;
  } else {
    error.textContent = input.validationMessage;
  }
}

//скрыть сообщение об ошибке для невалидного поля
function hideErrorMessage (error) {
error.style.visibility = "hidden";
}

// скрыть все сообщения об ошибках при закрытии попапа
function closeAllError (popup) {
  const errorList = Array.from(popup.querySelectorAll('.form__input-error'));
  errorList.forEach(error => {
    hideErrorMessage(error);
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

//проверка валидности всей формы
function hasInputError (form) {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  return inputList.some(input => {
    return !input.validity.valid;
  });
}


export {hasInputError, toggleSubmitButton, enableValidation, showErrorMessage, hideErrorMessage, closeAllError};
