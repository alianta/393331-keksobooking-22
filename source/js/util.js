/**
 * Функция, возвращающая случайное число из переданного диапазона включительно
 * @param {number} min - начало диапазона (включительно)
 * @param {number} max - конец диапазона (включительно)
 * @param {number} n - точность (количество знаков после запятой). Для целых чисел не указывается
 * @returns {number}
 */
const generateRandomNumber = function (min, max, n = 0) {
  if (min < 0 || max < 0) {
    return null;
  }
  if (min === max) {
    return min.toFixed(n);
  }
  let beginNumber = min;
  let endNumber = max;

  if (beginNumber > endNumber) {
    beginNumber = max;
    endNumber = min
  }

  let randomNumber = beginNumber + Math.random() * (endNumber + 1 - beginNumber);
  return (n === 0)? Math.floor(randomNumber) : randomNumber.toFixed(n);
}

/**
 * Функция определения что произошедшее событие было нажатием клавиша ESC
 * @param {*} evt - произошедшее событие
 * @returns  - true - была нажата клавиша ESC, fase - не была нажата клавиша ESC
 */
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {generateRandomNumber, isEscEvent};
