/*
Функция, возвращающая случайное целое число из переданного диапазона включительно
*/
const randomDigitNumber = function (min, max){
  if (min < 0 || max < 0) return null; //неверный диапазон (может быть только положительный или = 0)
  if (min == max) return Math.floor(min);
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

/*
Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
*/
const randomFloatNumber = function (min, max, n){
  if (min < 0 || max < 0) return null; //неверный диапазон (может быть только положительный или = 0)
  if (min == max) return min.toFixed(n);
  let beginNumber = min;
  let endNumber = max;

  //если начало диапазона генерации больше конца диапазона - поменять их местами
  if (beginNumber > endNumber) {
    beginNumber = max;
    endNumber = min
  }

  //решение о генерации случайного целого числа взяла с https://learn.javascript.ru/task/random-int-min-max
  let rand = beginNumber + Math.random() * (endNumber + 1 - beginNumber);
  return rand.toFixed(n);
}

randomDigitNumber(2,6);

randomFloatNumber(2,6,4);
