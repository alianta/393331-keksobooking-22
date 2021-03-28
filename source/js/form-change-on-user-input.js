const PRICE_FOR_TYPES = new Map([
  ['palace', 10000],
  ['flat', 1000],
  ['house', 5000],
  ['bungalow', 0],
]);

const elementType = document.querySelector('#type');
const elementPrice = document.querySelector('#price');
const elementCheckInTime = document.querySelector('#timein');
const elementCheckOutTime = document.querySelector('#timeout');

/**
 * Функция изменения min значания поля prie и plaleholder формы
 * @param {number} newMinPrice - новое min значение цены
 */
const changeDefaultPrice = (newMinPrice) => {
  elementPrice.placeholder = elementPrice.min = newMinPrice;
  elementPrice.setAttribute('min', newMinPrice);
}

/**
 * Функция логики обработки пользовательского воода для полей формы
 */
const formChangeOnUserInput = () => {
  elementType.addEventListener('change', () => {
    changeDefaultPrice(PRICE_FOR_TYPES.get(elementType.value));
  });
  elementCheckInTime.addEventListener('change', () => {
    elementCheckOutTime.value = elementCheckInTime.value;
  });
  elementCheckOutTime.addEventListener('change', () => {
    elementCheckInTime.value = elementCheckOutTime.value;
  });
}

export {formChangeOnUserInput,changeDefaultPrice};
