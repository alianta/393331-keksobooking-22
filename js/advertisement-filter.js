import {deleteAdvertisementMarkers} from './map.js';
const ANY = 'any';

const filter = document.querySelector('.map__filters');
const houseType = filter.querySelector('#housing-type');
const price = filter.querySelector('#housing-price');
const houseRooms = filter.querySelector('#housing-rooms');
const houseGuests = filter.querySelector('#housing-guests');

/**
 * Фильтрация  и отображение на карте массива объявлений
 * @param {array} advertisements  - массив для фильтрации
 * @returns - новый массив с отфильтрованными объявлениями
 */
const advertisementFilter = (advertisements) => {
  let filterAdvertisements = [];
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
      filterAdvertisements.push(ad);
    }
  });
  return filterAdvertisements;
}

/**
 * Обработчик событий на измнение пользователем фильтра
 * @param {function} cb - функция, вызываемая при наступлении события
 */
const changeUserForm = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
}

export {advertisementFilter, changeUserForm};
