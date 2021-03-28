/* global _:readonly */
import {deleteAdvertisementMarkers} from './map.js';
import {createCommonMarkers} from './map.js';

const ANY = 'any';
const PRICE_LOW = 10000;
const PRICE_HIGHT = 50000;
const PRICE_LOW_VALUE = 'low';
const PRICE_MIDDLE_VALUE = 'middle';
const PRICE_HIGHT_VALUE = 'high';
const RERENDER_DELAY = 500;

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
const filterAdvertisements = (advertisements) => {
  let filterAdvertisements = [];
  const houseTypeValue = houseType.value;
  const priceValue = price.value;
  const houseRoomsValue = houseRooms.value;
  const houseGuestsValue = houseGuests.value;
  const checkedFeatures = filter.querySelectorAll('input[name="features"]:checked');

  deleteAdvertisementMarkers();

  advertisements.forEach((advertisements) => {
    let isType = true;
    let isPrice = true;
    let isRooms = true;
    let isGuests = true;
    let isFeatures = true;

    if (houseTypeValue !== ANY) {
      isType = advertisements.offer.type === houseTypeValue;
    }
    if (priceValue !== ANY) {
      let price;
      if (advertisements.offer.price < PRICE_LOW) {
        price = PRICE_LOW_VALUE;
      } else if (advertisements.offer.price > PRICE_HIGHT) {
        price = PRICE_HIGHT_VALUE;
      } else {
        price = PRICE_MIDDLE_VALUE;
      }

      isPrice = price === priceValue;
    }
    if (houseRoomsValue !== ANY) {
      isRooms = advertisements.offer.rooms.toString() === houseRoomsValue;
    }
    if (houseGuestsValue !== ANY) {
      isGuests = advertisements.offer.guests.toString() === houseGuestsValue;
    }
    if (checkedFeatures.length) {
      checkedFeatures.forEach((feature) => {
        if (advertisements.offer.features.indexOf(feature.value) === -1) {
          isFeatures = false;
        }
      });
    }
    if (isType && isRooms && isGuests && isPrice && isFeatures) {
      filterAdvertisements.push(advertisements);
    }
  });
  return filterAdvertisements;
}

/**
 * Обработчик событий на измнение пользователем фильтра
 * @param {array} advertisements - массов объявлений для фильтрации
 */
const changeUserForm = (advertisements) => {
  filter.addEventListener('change', _.debounce(
    () => {
      createCommonMarkers(filterAdvertisements(advertisements));
    },
    RERENDER_DELAY,
  ));
}

export {filterAdvertisements, changeUserForm};
