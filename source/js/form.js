import {changeDefaultPrice} from './form-change-on-user-input.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const NOT_FOR_GUESTS_ROOM_VALUE = 100;
const NOT_FOR_GUESTS_CAPACITY_VALUE = 0;
const AVATAR_PLACEHOLDER = 'img/muffin-grey.svg';
const PRICE_FOR_TYPES = new Map([
  ['palace', 10000],
  ['flat', 1000],
  ['house', 5000],
  ['bungalow', 0],
]);

const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');
const address = form.querySelector('#address');
const avatarImg = form.querySelector('.ad-form-header__preview img');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomCount = form.querySelector('#room_number');
const capacityCount = form.querySelector('#capacity');
const type = form.querySelector('#type');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const features = form.querySelector('.features');
const description = form.querySelector('#description');
const imagesBlock = document.querySelector('.ad-form__photo');

/**
 * Функция перевода формы в неактивное состояние
 */
const formDisable = () => {
  form.classList.add('ad-form--disabled');
  formInteractivElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

/**
 * Функция перевода формы в активное состояние
 */
const formActive = () => {
  form.classList.remove('ad-form--disabled');
  formInteractivElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

/**
 * Функция перевода формы с фильтрами в неактивное состояние
 */
const mapFiltersDisable = () => {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

/**
 * Функция перевода формы в фильтрами в активное состояние
 */
const mapFiltersActive = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

/**
 * Функция отображения координат в поле адрес
 * @param {string} string  - строка содержащая координаты через запятую.
 */
const showCoordinate = (string) => {
  address.setAttribute('readonly', 'readonly');
  address.setAttribute('value',string);
}

/**
 * Функция валидации поля "заголовок объявления" формы
 */
const checkTitle = () => {
  titleInput.addEventListener('invalid', () => {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity(`Заголовок объявления должен иметь минимум ${MIN_TITLE_LENGTH} символов`);
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity(`Заголовок объявления не должен превышать ${MAX_TITLE_LENGTH} символов`);
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Взаголовке объявления не хватает ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`В заголовке объявления удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.reportValidity();
  });
}

/**
 * Функция валидации поля "Цена за ночь" формы
 */
const checkPrice = () => {
  let minPrice = parseInt(priceInput.min);
  let maxPrice = parseInt(priceInput.max);
  priceInput.addEventListener('focus',() => {
    minPrice = parseInt(priceInput.min);
    maxPrice = parseInt(priceInput.max);
  });

  priceInput.addEventListener('input', () => {
    const value = parseInt(priceInput.value);
    priceInput.value = priceInput.value.replace (/\D/, '');

    if (value < minPrice) {
      priceInput.setCustomValidity(`Цена за ночь долна быть не меньше  ${minPrice}`);
    } else if (value > maxPrice) {
      priceInput.setCustomValidity(`Цена за ночь не долна превышать ${maxPrice}`);
    } else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });
}

/**
 * Функция валидации полей "Количество комнат" и "Количество мест"
 */
const checkRoomAndCapacity = () => {
  roomCount.addEventListener('change', () => {
    const roomContValue = parseInt(roomCount.value);
    const capacityCountValue = parseInt(capacityCount.value);

    if (roomContValue !== NOT_FOR_GUESTS_ROOM_VALUE && capacityCountValue === NOT_FOR_GUESTS_CAPACITY_VALUE) {
      roomCount.setCustomValidity('Для варианта "Не для гостей" возможен только тип комнат "100 комнат"');
    } else if (roomContValue === NOT_FOR_GUESTS_ROOM_VALUE && capacityCountValue !== NOT_FOR_GUESTS_CAPACITY_VALUE) {
      roomCount.setCustomValidity('Тип комнат "100 комнат" возможен только для варианта "Не для гостей"');
    } else if (roomContValue < capacityCountValue) {
      roomCount.setCustomValidity(`Количество комнат должно  быть не меньше  ${capacityCount.value}`);
    } else {
      roomCount.setCustomValidity('');
      capacityCount.setCustomValidity('');
    }

    roomCount.reportValidity();
  });


  capacityCount.addEventListener('change', () => {
    const roomContValue = parseInt(roomCount.value);
    const capacityCountValue = parseInt(capacityCount.value);

    if (roomContValue === NOT_FOR_GUESTS_ROOM_VALUE && capacityCountValue !== NOT_FOR_GUESTS_CAPACITY_VALUE) {
      capacityCount.setCustomValidity('Для типа комнат "100 комнат" возможен вариат только "не для гостей"');
    } else if (roomContValue !== NOT_FOR_GUESTS_ROOM_VALUE && capacityCountValue === NOT_FOR_GUESTS_CAPACITY_VALUE) {
      capacityCount.setCustomValidity('Вариант "не для гостей" возможен только для типа комнат "100 комнат"');
    } else if (roomContValue < parseInt(capacityCount.value) ) {
      capacityCount.setCustomValidity(`Количество гостей должно быть не больше  ${roomCount.value}`);
    } else {
      capacityCount.setCustomValidity('');
      roomCount.setCustomValidity('');
    }

    capacityCount.reportValidity();
  });
}

/**
 * Функция валидации формы
 */
const checkForm = () => {
  checkTitle();
  checkPrice();
  checkRoomAndCapacity();
}

/**
 * Сброс фильтрации объявлений
 */
const clearFilter = () => {
  const houseType = mapFilter.querySelector('#housing-type');
  houseType.value = houseType.querySelector('[selected]').value;

  const price = mapFilter.querySelector('#housing-price');
  price.value = price.querySelector('[selected]').value;

  const rooms = mapFilter.querySelector('#housing-rooms');
  rooms.value = rooms.querySelector('[selected]').value;

  const guests = mapFilter.querySelector('#housing-guests');
  guests.value = guests.querySelector('[selected]').value;

  const featuresInputs = mapFilter.querySelector('#housing-features').querySelectorAll('input');
  featuresInputs.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    }
  });
}

/**
 * Сброс полей формы в исходное состояние
 */
const clearForm = () => {
  avatarImg.src = AVATAR_PLACEHOLDER;

  titleInput.value = '';

  type.value = type.querySelector('[selected]').value;

  priceInput.value = '';

  changeDefaultPrice(PRICE_FOR_TYPES.get(type.value));

  timein.value = timein.querySelector('[selected]').value;

  timeout.value = timeout.querySelector('[selected').value;

  roomCount.value = roomCount.querySelector('[selected]').value;

  capacityCount.value = capacityCount.querySelector('[selected]').value;

  const featuresInputs = features.querySelectorAll('input');
  featuresInputs.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    }
  });

  description.value = '';

  while (imagesBlock.firstChild) {
    imagesBlock.removeChild(imagesBlock.lastChild);
  }
}
export {formDisable, mapFiltersDisable, formActive, mapFiltersActive, showCoordinate, checkForm, clearFilter, clearForm};
