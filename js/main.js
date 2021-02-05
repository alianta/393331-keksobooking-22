/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 *
 * @param {number} min - начало диапазона (включительно)
 * @param {number} max - конец диапазона (включительно)
 * @returns {number}
 */
const randomIntegerNumber = function (min, max) {
  if (min < 0 || max < 0) {
    return null;//неверный диапазон (может быть только положительный или = 0)
  }
  if (min == max) {
    return Math.floor(min);
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
  return Math.floor(rand);
}

randomIntegerNumber(2,6);

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 *
 * @param {number} min - начало диапазона (включительно)
 * @param {number} max - конец диапазона (включительно)
 * @returns {number}
 */
const randomFloatNumber = function (min, max, n = 0) {
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

const INITIAL_DATA = {
  avatarTemplateStart: 'img/avatars/user',
  avatarTemplateEnd: '.png',
  avatarStartNumber: 1,
  avatarEndNumber: 8,
  titles: [
    'аппартаменты Сакура',
    'коттедж Зимний',
    'хостел Лето',
    'аппартаменты У моря',
    'отель Москва-река',
  ],
  minPrice: 2000,
  maxPrice: 25000,
  types: [
    'palace',
    'flat',
    'house',
    'bungalow',
  ],
  minRoomCount: 1,
  maxRoomCount: 4,
  minGuests: 1,
  maxGuests: 6,
  checkInOutTimes: [
    '12:00',
    '13:00',
    '14:00',
  ],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  descriptions: [
    'просторная комната с видом на Неву',
    'аппартаменты в самом центре города почти даром!',
    'однокомнатная квартина у метро',
    'трехкомнатная квартира для всей семьи',
  ],
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ],
  minPhotosCount: 4,
  maxPhotosCount: 11,
  startXLocation: 35.65000,
  endXLocation: 35.70000,
  startYLocation: 139.70000,
  endYLocation: 139.80000,
  locationPrecision: 5,
}

const RANDOM_OBJECTS_COUNT = 10;

/**
 * Функция, возвращающая объект, содержащий строку — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это случайное число от 1 до 8 с ведущим нулём.
 *
 * @param {string} startString - начало строки с адресом изображения
 * @param {string} endString - конец строки с адресом изображения
 * @param {number} startRange - начало диапазона для случайного числа в адресе изображения
 * @param {number} endRange - конец диапазона для случайного числа в адресе изображения
 * @returns {object}
 */
const getRandomAuthor = (startString, endString , startRange, endRange) => {
  return {
    avatar: startString + '0' + randomFloatNumber(startRange, endRange) + endString,
  };
}

/**
 * Функция, возвращающая объект — местоположение в виде случайных географических координат в заданном диапазоне
 *
 * @param {number} startX - начало диапазона широты (включительно)
 * @param {number} endX - конец диапазона широты (включительно)
 * @param {number} startY - начало диапазона долготы (включительно)
 * @param {number} endY - конец диапазона долготы (включительно)
 * @param {number} precision - точность координат (количество знаков после запятой)
 * @returns {object}
 */
const getRandomLocation = (startX, endX, startY, endY, precision) => {
  return {
    x: randomFloatNumber(startX, endX, precision),
    y: randomFloatNumber(startY, endY, precision),
  };
}

/**
 * Функция, возвращающая массив случайной длины из значений с адресами фотографий
 *
 * @param {array} photos - массив строк, содержащий адреса фотографий
 * @param {number} minCount - минимальная длина массива
 * @param {number} maxCount - максимальная длина массива
 * @returns {array} - массив случайной длины, содержащий строки адресами фотографий из массива photos в случайном порядке
 */
const getRandomPhotos = (photos, minCount, maxCount) => {
  let result = [];
  const photosCount = randomFloatNumber(minCount, maxCount);
  const photosLength = photos.length-1;
  for(let i=0; i< photosCount; i++) {
    const fotoItemNumber = randomFloatNumber(0, photosLength);
    result.push(photos[fotoItemNumber]);
  }
  return result;
}

/**
 * Функция, возвращающая случайный элемент из переданного массива.
 *
 * @param {array} descriptions - массив
 * @returns {string} - случайный элемент
 */
const getArrayRandomItem = (array) => {
  return array[randomFloatNumber(0, array.length-1)];
}

/**
 * Функция, возвращающая случайный объект, расположенных неподалёку.
 *
 * @returns {object}
 */
const getRandomAdvertisement = (data) => {
  return {
    author: getRandomAuthor(data.avatarTemplateStart, data.avatarTemplateEnd, data.avatarStartNumber, data.avatarEndNumber),
    offer: {
      title: getArrayRandomItem(data.titles),
      address: null,
      price: randomFloatNumber(data.minPrice, data.maxPrice),
      type: getArrayRandomItem(data.types),
      rooms: randomFloatNumber(data.minRoomCount, data.maxRoomCount),
      guests: randomFloatNumber(data.minGuests, data.maxGuests),
      checkin: getArrayRandomItem(data.checkInOutTimes),
      checkout: getArrayRandomItem(data.checkInOutTimes),
      features: null,
      description: getArrayRandomItem(data.descriptions),
      photos: getRandomPhotos(data.photos, data.minPhotosCount, data.maxPhotosCount),
    },
    location: getRandomLocation(data.startXLocation, data.endXLocation, data.startYLocation, data.endYLocation, data.locationPrecision),
  }
}

/**
 * Функция, возвращающая массив случайных объектов, расположенных неподалёку.
 * @param {number} count - количество создаваемых объектов
 * @returns {array}
 */
const getRandomArrayAdvertisements = (count) => {
  return new Array(count).fill(null).map(() => getRandomAdvertisement(INITIAL_DATA));
}
getRandomArrayAdvertisements(RANDOM_OBJECTS_COUNT)
