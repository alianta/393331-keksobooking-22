/**
 * Функция, возвращающая случайное число из переданного диапазона включительно
 *
 * @param {number} min - начало диапазона (включительно)
 * @param {number} max - конец диапазона (включительно)
 * @param {number} n - точность (количество знаков после запятой). Для целых чисел не указывается
 * @returns {number}
 */
const generateRandomNumber = function (min, max, n = 0) {
  if (min < 0 || max < 0) {
    return null; //неверный диапазон (может быть только положительный или = 0)
  }
  if (min == max) {
    return min.toFixed(n);
  }
  let beginNumber = min;
  let endNumber = max;

  //если начало диапазона генерации больше конца диапазона - поменять их местами
  if (beginNumber > endNumber) {
    beginNumber = max;
    endNumber = min
  }

  //решение о генерации случайного целого числа взяла с https://learn.javascript.ru/task/random-int-min-max
  let rand = beginNumber + Math.random() * (endNumber + 1 - beginNumber);
  return (n == 0)? Math.floor(rand) : rand.toFixed(n);
}

const AvatarSetting = {
  TEMPLATE_START: 'img/avatars/user',
  TEMPLATE_END: '.png',
  START_NUMBER: 1,
  END_NUMBER: 8,
};

const PhotosSetting = {
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ],
  MIN_COUNT: 4,
  MAX_COUNT: 11,
};

const LocationSetting = {
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
const FEATURE = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'просторная комната с видом на Неву',
  'аппартаменты в самом центре города почти даром!',
  'однокомнатная квартина у метро',
  'трехкомнатная квартира для всей семьи',
];

const Price = {
  MIN: 2000,
  MAX: 25000,
};

const RoomSetting = {
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


const RANDOM_OBJECTS_COUNT = 10;

/**
 * Функция, возвращающая массив случайной длины из значений переданного массива
 *
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
 *
 * @param {array} - массив
 * @returns {string} - случайный элемент
 */
const getRandomItemFromArray = (array) => {
  return array[generateRandomNumber(0, array.length-1)];
}

/**
 * Функция, возвращающая случайный объект, расположенных неподалёку.
 *
 * @returns {object}
 */
const getRandomAdvertisement = () => {

  const locationX = generateRandomNumber(LocationSetting.START_X, LocationSetting.END_X, LocationSetting.PRECISION);
  const locationY = generateRandomNumber(LocationSetting.START_Y, LocationSetting.END_Y, LocationSetting.PRECISION);

  return {
    author: {
      avatar: AvatarSetting.TEMPLATE_START + '0' + generateRandomNumber(AvatarSetting.START_NUMBER, AvatarSetting.END_NUMBER) + AvatarSetting.TEMPLATE_END,
    },
    offer: {
      title: getRandomItemFromArray(TITLES),
      address: `${locationX}, ${locationY}`,
      price: generateRandomNumber(Price.MIN, Price.MAX),
      type: getRandomItemFromArray(TYPES),
      rooms: generateRandomNumber(RoomSetting.MIN_COUNT, RoomSetting.MAX_COUNT),
      guests: generateRandomNumber(RoomSetting.MIN_GUESTS, RoomSetting.MAX_GIESTS),
      checkin: getRandomItemFromArray(CHECK_IN_OUT_TIME),
      checkout: getRandomItemFromArray(CHECK_IN_OUT_TIME),
      features: getNewRandomArrayWithoutRepeat(FEATURE),
      description: getRandomItemFromArray(DESCRIPTION),
      photos: getNewRandomArray(PhotosSetting.PHOTOS, PhotosSetting.MIN_COUNT, PhotosSetting.MAX_COUNT),
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
getRandomArrayAdvertisements(RANDOM_OBJECTS_COUNT)
