import {onSuccess, onError} from './modal.js';

const form = document.querySelector('.ad-form');
const SERVER_ADDRESS =  'https://22.javascript.pages.academy/keksobooking';

/**
 * Фцнкция отправки формы
 */
const submitForm = () => {
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
      .then(() => onSuccess())
      .catch(() => onError());
  });
}


export {submitForm};
