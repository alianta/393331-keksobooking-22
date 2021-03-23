import {deleteAdvertisementMarkers} from './map.js';
import {createCommonMarkers} from './map.js';

const ANY = 'any';
const PRICE_LOW = 10000;
const PRICE_HIGHT = 50000;
const PRICE_LOW_VALUE = 'low';
const PRICE_MIDDLE_VALUE = 'middle';
const PRICE_HIGHT_VALUE = 'high';

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
  const priceValue = price.value;
  const houseRoomsValue = houseRooms.value;
  const houseGuestsValue = houseGuests.value;
  const checkedFeatures = filter.querySelectorAll('input[name="features"]:checked');


  //удалить маркеры
  deleteAdvertisementMarkers();

  advertisements.forEach((ad) => {
    let isType = true;
    let isPrice = true;
    let isRooms = true;
    let isGuests = true;
    let isFeatures = true;

    if (houseTypeValue !== ANY) {
      isType = ad.offer.type === houseTypeValue;
    }
    if (priceValue !== ANY) {
      let price;
      if (ad.offer.price < PRICE_LOW) {
        price = PRICE_LOW_VALUE;
      } else if (ad.offer.price > PRICE_HIGHT) {
        price = PRICE_HIGHT_VALUE;
      } else {
        price = PRICE_MIDDLE_VALUE;
      }

      isPrice = price === priceValue;
    }
    if (houseRoomsValue !== ANY) {
      isRooms = ad.offer.rooms.toString() === houseRoomsValue;
    }
    if (houseGuestsValue !== ANY) {
      isGuests = ad.offer.guests.toString() === houseGuestsValue;
    }
    if (checkedFeatures.length) {
      checkedFeatures.forEach((feature) => {
        if (ad.offer.features.indexOf(feature.value) === -1) {
          isFeatures = false;
        }
      });
    }
    if (isType && isRooms && isGuests && isPrice && isFeatures) {
      filterAdvertisements.push(ad);
    }
  });
  return filterAdvertisements;
}

/**
 * Обработчик событий на измнение пользователем фильтра
 * @param {function} cb - функция, вызываемая при наступлении события
 */
const changeUserForm = (ad) => {
  filter.addEventListener('change', () => {
    createCommonMarkers(advertisementFilter(ad));
  });
}

export {advertisementFilter, changeUserForm};
