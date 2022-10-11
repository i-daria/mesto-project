import {validationSettings} from './utils.js';

//валидация формы
function enableValidation (validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(form, validationSettings);
  });
}

//установить слушатели полям формы
function setEventListeners (form) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));
  inputList.forEach(input => {
    //добавить слушатель на ввод символов в поля формы
    input.addEventListener('input', function () {
      //проверка валидности поля
      isValid(form, input);
    });
  });
  //переключаем состояние кнопки отправки формы
  toggleSubmitButton(form);
}

//проверка валидности поля ввода
function isValid (form, input) {
  const error = form.querySelector(`.${input.id}-error`);

  if(!input.validity.valid) {
    showErrorMessage(error, input)
  } else {
    hideErrorMessage(error, input);
  }
  toggleSubmitButton(form);
}

//показать сообщение об ошибке для невалидного поля
function showErrorMessage (error, input) {
  input.classList.add(validationSettings.inputErrorClass);
  error.classList.add(validationSettings.errorClass);

  if (input.validity.patternMismatch){
    error.textContent = input.dataset.errorMessage;
  } else {
    error.textContent = input.validationMessage;
  }
}

//скрыть сообщение об ошибке для невалидного поля
function hideErrorMessage (error, input) {
  error.classList.remove(validationSettings.errorClass);
  input.classList.remove(validationSettings.inputErrorClass);
}

// скрыть все сообщения об ошибках при закрытии попапа
function closeAllError (popup) {
  const errorList = Array.from(popup.querySelectorAll(`.${validationSettings.errorClass}`));
  const inputinvalidList = Array.from(popup.querySelectorAll(`.${validationSettings.inputErrorClass}`));
  if (inputinvalidList.length > 0) {
    for (let i = 0; i < inputinvalidList.length; i++) {
      hideErrorMessage(errorList[i], inputinvalidList[i]);
    }
  }
}

//переключатель отображения кнопки отправки формы
function toggleSubmitButton (form) {
  const submitButton = form.querySelector(validationSettings.submitButtonSelecor);
  if (hasInputError(form)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

//проверка валидности всей формы
function hasInputError (form) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));
  return inputList.some(input => {
    return !input.validity.valid;
  });
}


export {hasInputError, toggleSubmitButton, showErrorMessage, hideErrorMessage, closeAllError, isValid, enableValidation, setEventListeners};
