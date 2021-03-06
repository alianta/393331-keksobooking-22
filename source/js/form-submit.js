import {onSuccess, onError} from './modal.js';

const SERVER_ADDRESS =  'https://22.javascript.pages.academy/keksobooking';

const form = document.querySelector('.ad-form');

/**
 * Фцнкция добавления обработчика события "отправка формы"
 * @param {array} advertisments - массив объявлений
 */
const submitForm = (advertisments) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      SERVER_ADDRESS,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(res => res.ok ? res : Promise.reject(res))
      .then(() => onSuccess(advertisments))
      .catch(() => onError());
  });
}

export {submitForm};
