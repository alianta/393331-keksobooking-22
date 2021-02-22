const elementType = document.querySelector('#type');
const elementPrice = document.querySelector('#price');
const PRICE_FOR_TYPE = new Map([
  ['palace', 10000],
  ['flat', 1000],
  ['house', 5000],
  ['bungalow', 0],
]);
/**
 * Функция изменения min значания поля prie и plaleholder формы
 * @param {number} newMinPrice - новое min значение цены
 */
const chaneDefaultPrice = (newMinPrice) => {
  elementPrice.placeholder=newMinPrice;
  elementPrice.min=newMinPrice;
}

/**
 * Функция логики обработки пользовательского воода для полей формы
 */
const formChangeOnUserInput = () => {
  elementType.addEventListener('change', () => {
    chaneDefaultPrice(PRICE_FOR_TYPE.get(elementType.value));
  });

}

export {formChangeOnUserInput};