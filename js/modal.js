import {isEscEvent} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main');

/**
 * Фцнкция добавления модальный окон в разметку в блок main (окна по умолчанию скрыты)
 */
const addModalWondows = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  main.appendChild(successMessage);
  main.querySelector('.success').classList.add('visually-hidden');
}

/**
 * Функция показа и скрытия модального окна при успешной отправке формы
 */
const onSuccess = () => {
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

}

export {addModalWondows, onSuccess};
