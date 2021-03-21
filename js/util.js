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

/**
 * Функция определения что произошедшее событие было нажатием клавиша ESC
 * @param {*} evt - произошедшее событие
 * @returns  - true - была нажата клавиша ESC, fase - не была нажата клавиша ESC
 */
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {generateRandomNumber, isEscEvent};
