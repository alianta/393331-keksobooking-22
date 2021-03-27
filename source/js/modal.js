import {isEscEvent} from './util.js';
import {clearFilter, clearForm} from './form.js';
import {createCommonMarkers, resetMainMarker} from './map.js';

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
  const onKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.querySelector('.success').classList.add('visually-hidden');
      document.removeEventListener('keydown',onKeydown);
    }
  };
  const onClick = () => {
    main.querySelector('.success').classList.add('visually-hidden');
    document.removeEventListener('click',onClick);
  };
  successMessage.classList.remove('visually-hidden');
  successMessage.style.zIndex = '1000';

  document.addEventListener('click', onClick);
  document.addEventListener('keydown',onKeydown);
  //возврат фильтра формы в исходное состояние и отрисовка пинов после успешной отправки
  clearFilter();
  clearForm();
  createCommonMarkers(advertisments);
  resetMainMarker();
}

/**
 * Функция показа и скрытия модального окна при ошибке отправки формы
 */
const onError = () => {
  const errorMessage = main.querySelector('.error');
  const errorButton = main.querySelector('.error__button');
  const onKeydown =  (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      main.querySelector('.error').classList.add('visually-hidden');
      document.removeEventListener('keydown', onKeydown);
    }
  };
  const onClick = () => {
    main.querySelector('.error').classList.add('visually-hidden');
    document.removeEventListener('click', onClick);
  };
  errorMessage.classList.remove('visually-hidden');
  errorMessage.style.zIndex = '1000';
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
  errorButton.addEventListener('click', () => {
    main.querySelector('.error').classList.add('visually-hidden');
  });
}

export {addModalWindows, onSuccess, onError};
