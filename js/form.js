const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const NOT_FOR_GUESTS_ROOM_VALUE = 100;
const NOT_FOR_GUESTS_CAPACITY_VALUE = 0;

const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');
const address = form.querySelector('#address');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomCount = form.querySelector('#room_number');
const capacityCount = form.querySelector('#capacity');
const type = form.querySelector('#type');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const features = form.querySelector('.features');
const description = form.querySelector('#description');

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
const titleInputValidation = () => {
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
const priceInputValidation = () => {
  let minPrice = priceInput.min;
  let maxPrice = priceInput.max;
  priceInput.addEventListener('focus',() => {
    minPrice = priceInput.min;
    maxPrice = priceInput.max;
  });

  priceInput.addEventListener('invalid', () => {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity(`Цена за ночь долна быть не меньше  ${minPrice}`);
    } else if (priceInput.validity.tooLong) {
      priceInput.setCustomValidity(`Цена за ночь не долна превышать ${maxPrice}`);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Обязательное поле');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  priceInput.addEventListener('input', () => {
    const value = titleInput.value;

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
const roomAndCapacityValidation = () => {
  roomCount.addEventListener('change', () => {

    if (roomCount.value != NOT_FOR_GUESTS_ROOM_VALUE && capacityCount.value == NOT_FOR_GUESTS_CAPACITY_VALUE) {
      roomCount.setCustomValidity('Не для гостей возможен только тип комнат "100 комнат"');
    } else if (roomCount.value < capacityCount.value) {
      roomCount.setCustomValidity(`Количество комнат должно  быть не меньше  ${capacityCount.value}`);
    } else {
      roomCount.setCustomValidity('');
    }

    roomCount.reportValidity();
  });

  capacityCount.addEventListener('change', () => {

    if (roomCount.value == NOT_FOR_GUESTS_ROOM_VALUE && capacityCount.value != NOT_FOR_GUESTS_CAPACITY_VALUE) {
      capacityCount.setCustomValidity('Для типа комнат "100 комнат" возможен вариат только "не для гостей"');
    } else if (roomCount.value < capacityCount.value || capacityCount.value == NOT_FOR_GUESTS_CAPACITY_VALUE) {
      capacityCount.setCustomValidity(`Количество гостей должно быть не больше  ${roomCount.value}`);
    } else {
      capacityCount.setCustomValidity('');
    }

    capacityCount.reportValidity();
  });
}

/**
 * Функция валидации формы
 */
const formValidation = () => {
  titleInputValidation();
  priceInputValidation();
  roomAndCapacityValidation();
}

/**
 * Сброс фильтрации объявлений
 */
const clearFilter = () => {
  const houseType = mapFilter.querySelector('#housing-type');
  const houseTypeInitialValue = houseType.querySelector('[selected]').value;
  houseType.value = houseTypeInitialValue;

  const price = mapFilter.querySelector('#housing-price');
  const priceInitialValue = price.querySelector('[selected]').value;
  price.value = priceInitialValue;

  const rooms = mapFilter.querySelector('#housing-rooms');
  const roomsInitialValue = rooms.querySelector('[selected]').value;
  rooms.value = roomsInitialValue;

  const guests = mapFilter.querySelector('#housing-guests');
  const guestsInitialValue = guests.querySelector('[selected]').value;
  guests.value = guestsInitialValue;

  const featuresInputs = mapFilter.querySelector('#housing-features').querySelectorAll('input');
  featuresInputs.forEach((input) => {
    if(input.checked){
      input.checked = false;
    }
  });
}

/**
 * Сброс полей формы в исходное состояние
 */
const clearForm = () => {
  titleInput.value = '';

  const typeInitialValue = type.querySelector('[selected]').value;
  type.value = typeInitialValue;

  priceInput.value = '';

  const timeinInitialValue = timein.querySelector('[selected]').value;
  timein.value = timeinInitialValue;

  const timeoutInitialValue = timeout.querySelector('[selected').value;
  timeout.value = timeoutInitialValue;

  const roomCountInitialValue = roomCount.querySelector('[selected]').value;
  roomCount.value = roomCountInitialValue;

  const capacityCountInitialValue = capacityCount.querySelector('[selected]').value;
  capacityCount.value = capacityCountInitialValue;

  const featuresInputs = features.querySelectorAll('input');
  featuresInputs.forEach((input) => {
    if(input.checked){
      input.checked = false;
    }
  });

  description.value = '';
}
export {formDisable, mapFiltersDisable, formActive, mapFiltersActive, showCoordinate, formValidation, clearFilter, clearForm};
