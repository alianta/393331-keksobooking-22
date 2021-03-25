import {generateRandomNumber} from './util.js';

const AvatarSettings = {
  TEMPLATE_START: 'img/avatars/user',
  TEMPLATE_END: '.png',
  START_NUMBER: 1,
  END_NUMBER: 8,
};

const PhotosSettings = {
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ],
  MIN_COUNT: 4,
  MAX_COUNT: 11,
};

const LocationSettings = {
  START_X: 35.65000,
  END_X: 35.70000,
  START_Y: 139.70000,
  END_Y: 139.80000,
  PRECISION: 5,
};

const TITLES = [
  'аппартаменты Сакура',
  'коттедж Зимний',
  'хостел Лето',
  'аппартаменты У моря',
  'отель Москва-река',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'просторная комната с видом на Неву',
  'аппартаменты в самом центре города почти даром!',
  'однокомнатная квартина у метро',
  'трехкомнатная квартира для всей семьи',
];

const PriceSettings = {
  MIN: 2000,
  MAX: 25000,
};

const RoomSettings = {
  MIN_COUNT:1,
  MAX_COUNT: 4,
  MIN_GUESTS: 1,
  MAX_GIESTS: 6,
}
const CHECK_IN_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

/**
 * Функция, возвращающая массив случайной длины из значений переданного массива
 * @param {array} photos - массив строк, содержащий адреса фотографий
 * @param {number} minCount - минимальная длина массива
 * @param {number} maxCount - максимальная длина массива
 * @returns {array} - массив случайной длины, содержащий значения переданного массива в случайном порядке
 */
const getNewRandomArray = (array, minCount, maxCount) => {
  let newArray = [];
  const newArrayCount = generateRandomNumber(minCount, maxCount);
  const arrayLength = array.length-1;
  for(let i=0; i< newArrayCount; i++) {
    const itemNumber = generateRandomNumber(0, arrayLength);
    newArray.push(array[itemNumber]);
  }
  return newArray;
}

/**
 * Функция, возвращающая массив случайной длины из значений переданного массива без повторений элементов
 * @param {array} array -исходный массив
 * @returns {array} - массив случайной длины, содержащий значения переданного массива в случайном порядке без повторений
 */
const getNewRandomArrayWithoutRepeat = (array) => {
  let newArray = [];
  const newArrayLength = generateRandomNumber(1, array.length);
  for(let i=0; i< newArrayLength; i++) {
    const newElementNumber = generateRandomNumber(i, array.length - 1);
    newArray.push(array[newElementNumber]);
    [array[i], array[newElementNumber]] = [array[newElementNumber], array[i]];
  }
  return newArray;
}
/**
 * Функция, возвращающая случайный элемент из переданного массива.
 * @param {array} - массив
 * @returns {string} - случайный элемент
 */
const getRandomItemFromArray = (array) => {
  return array[generateRandomNumber(0, array.length-1)];
}

/**
 * Функция, возвращающая случайный объект, расположенных неподалёку.
 * @returns {object}
 */
const getRandomAdvertisement = () => {

  const locationX = generateRandomNumber(LocationSettings.START_X, LocationSettings.END_X, LocationSettings.PRECISION);
  const locationY = generateRandomNumber(LocationSettings.START_Y, LocationSettings.END_Y, LocationSettings.PRECISION);

  return {
    author: {
      avatar: AvatarSettings.TEMPLATE_START + '0' + generateRandomNumber(AvatarSettings.START_NUMBER, AvatarSettings.END_NUMBER) + AvatarSettings.TEMPLATE_END,
    },
    offer: {
      title: getRandomItemFromArray(TITLES),
      address: `${locationX}, ${locationY}`,
      price: generateRandomNumber(PriceSettings.MIN, PriceSettings.MAX),
      type: getRandomItemFromArray(TYPES),
      rooms: generateRandomNumber(RoomSettings.MIN_COUNT, RoomSettings.MAX_COUNT),
      guests: generateRandomNumber(RoomSettings.MIN_GUESTS, RoomSettings.MAX_GIESTS),
      checkin: getRandomItemFromArray(CHECK_IN_OUT_TIME),
      checkout: getRandomItemFromArray(CHECK_IN_OUT_TIME),
      features: getNewRandomArrayWithoutRepeat(FEATURES),
      description: getRandomItemFromArray(DESCRIPTIONS),
      photos: getNewRandomArray(PhotosSettings.PHOTOS, PhotosSettings.MIN_COUNT, PhotosSettings.MAX_COUNT),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
}

/**
 * Функция, возвращающая массив случайных объектов, расположенных неподалёку.
 * @param {number} count - количество создаваемых объектов
 * @returns {array}
 */
const getRandomArrayAdvertisements = (count) => {
  return new Array(count).fill(null).map(() => getRandomAdvertisement());
}

export {getRandomArrayAdvertisements};
