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

randomIntegerNumber(2,6);

const START_X_LOCATION = 35.65000;
const END_X_LOCATION = 35.70000;
const START_Y_LOCATION = 139.70000;
const END_Y_LOCATION = 139.80000;
const LOCATION_PRECISION = 5;
const MIN_PHOTOS_COUNT = 4;
const MAX_PHOTOS_COUNT = 11;

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const DESCRIPTIONS = [
  'просторная комната с видом на Неву',
  'аппартаменты в самом центре города почти даром!',
  'однокомнатная квартина у метро',
  'трехкомнатная квартира для всей семьи',
];
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

getRandomLocation(START_X_LOCATION, END_X_LOCATION, START_Y_LOCATION, END_Y_LOCATION, LOCATION_PRECISION);


/**
 * Функция, возвращающая массив случайной длины из значений с адресами фотографий
 *
 * @param {array} photos - массив строк, содержащий адреса фотографий
 * @returns {array} - массив случайной длины, содержащий строки адресами фотографий из массива photos в случайном порядке
 */
const getRandomPhotos = (photos) => {
  let result = [];
  const photosCount = randomFloatNumber(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT);
  const photosLength = photos.length-1;
  for(let i=0; i< photosCount; i++) {
    const fotoItemNumber = randomFloatNumber(0, photosLength);
    result.push(photos[fotoItemNumber]);
  }
  return result;
}

getRandomPhotos(PHOTOS);

/**
 * Функция, возвращающая случайное описание помещения.
 *
 * @param {array} descriptions - массив строк, содержащий описание помещений
 * @returns {string} - строка, содержащая случайное описание помещения
 */
const getRandomDescription = (descriptions) => {
  return descriptions[randomFloatNumber(0, descriptions.length-1)];
}

getRandomDescription(DESCRIPTIONS);
