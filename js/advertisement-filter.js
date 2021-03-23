import {deleteAdvertisementMarkers, createCommonMarker} from './map.js';
const ANY = 'any';

const filter = document.querySelector('.map__filters');
const houseType = filter.querySelector('#housing-type');
const price = filter.querySelector('#housing-price');
const rooms = filter.querySelector('#housing-rooms');
const guests = filter.querySelector('#housing-guests');
const houseRooms = filter.querySelector('#housing-rooms');
const houseGuests = filter.querySelector('#housing-guests');

/**
 * Фильтрация  и отображение на карте массива объявлений
 * @param {array} advertisements  - массив для фильтрации
 */
const advertisementFilter = (advertisements) => {
  const houseTypeValue = houseType.value;
  const houseRoomsValue = houseRooms.value;
  const houseGuestsValue = houseGuests.value;

  let isType = true;
  let isRooms = true;
  let isGuests = true;

  //удалить маркеры
  deleteAdvertisementMarkers();

  advertisements.forEach((ad) => {
    if (houseTypeValue !== ANY) {
      isType = ad.offer.type === houseTypeValue;
    }
    if (houseRoomsValue !== ANY) {
      isRooms = ad.offer.rooms.toString() === houseRoomsValue;
    }
    if (houseGuestsValue !== ANY) {
      isGuests = ad.offer.guests.toString() === houseGuestsValue;
    }

    if(isType && isRooms && isGuests) {
      createCommonMarker(ad);
    }
  });
}

/**
 * Обработчик событий на измнение пользователем фильтра "тип жилья"
 * @param {function} cb - функция, вызываемая при наступлении события
 */
const houseTypeChange = (cb) => {
  houseType.addEventListener('change', () => {
    cb();
  });
}

/**
 * Обработчик событий на измнение пользователем фильтра "цена"
 * @param {function} cb - функция, вызываемая при наступлении события
 */
const priceChange = (cb) => {
  price.addEventListener('change', () => {
    cb();
  });
}

/**
 * Обработчик событий на измнение пользователем фильтра "количество комнат"
 * @param {function} cb - функция, вызываемая при наступлении события
 */
const roomsChange = (cb) => {
  rooms.addEventListener('change', () => {
    cb();
  });
}

/**
 * Обработчик событий на измнение пользователем фильтра "количество гостей"
 * @param {function} cb - функция, вызываемая при наступлении события
 */
const guestsChange = (cb) => {
  guests.addEventListener('change', () => {
    cb();
  });
}
export {advertisementFilter, priceChange, houseTypeChange, roomsChange, guestsChange};
