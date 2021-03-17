import {createCommonMarkers} from './map.js';

/**
 * Функция получает данные с объявлениями с сервера и отрисовывает их на карте
 */
const getAdvertisments = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((advertisements) => {
      createCommonMarkers(advertisements);
    });
}

export {getAdvertisments};
