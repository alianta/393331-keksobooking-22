const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');
const address = form.querySelector('#address');

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
 * string {string} - строка содержащая координаты через запятую.
 */
const showCoordinate = (string) => {
  address.setAttribute('readonly', 'readonly');
  address.setAttribute('value',string);
}
export {formDisable, mapFiltersDisable, formActive, mapFiltersActive, showCoordinate};
