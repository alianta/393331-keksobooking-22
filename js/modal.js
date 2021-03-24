import {isEscEvent} from './util.js';
import {clearFilter, clearForm} from './form.js';
import {createCommonMarkers} from './map.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');

/**
 * Фцнкция добавления модальный окон в разметку в блок main (окна по умолчанию скрыты)
 */
const addModalWindows = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  main.appendChild(successMessage);
  main.querySelector('.success').classList.add('visually-hidden');

  const errorMessage = errorMessageTemplate.cloneNode(true);
  main.appendChild(errorMessage);
  main.querySelector('.error').classList.add('visually-hidden');
}

/**
 * Функция показа и скрытия модального окна при успешной отправке формы
 */
const onSuccess = (advertisments) => {
  const successMessage = main.querySelector('.success');
  successMessage.classList.remove('visually-hidden');
  document.addEventListener('click', () => {
    main.querySelector('.success').classList.add('visually-hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.querySelector('.success').classList.add('visually-hidden');
    }
  });
  //возврат фильтра формы в исходное состояние и отрисовка пинов после успешной отправки
  clearFilter();
  clearForm();
  createCommonMarkers(advertisments);
}

/**
 * Функция показа и скрытия модального окна при ошибке отправки формы
 */
const onError = () => {
  const errorMessage = main.querySelector('.error');
  const errorButton = main.querySelector('.error__button');
  errorMessage.classList.remove('visually-hidden');
  document.addEventListener('click', () => {
    main.querySelector('.error').classList.add('visually-hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.querySelector('.error').classList.add('visually-hidden');
    }
  });
  errorButton.addEventListener('click', () => {
    main.querySelector('.error').classList.add('visually-hidden');
  });
}

export {addModalWindows, onSuccess, onError};
