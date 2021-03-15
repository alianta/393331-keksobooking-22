const form = document.querySelector('.ad-form');
const formInteractivElements = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');
const address = form.querySelector('#address');
const titleInput = form.querySelector('#title');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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
 * Фугкция валидации формы
 */
const formValidation = () => {
  titleInputValidation();
}
export {formDisable, mapFiltersDisable, formActive, mapFiltersActive, showCoordinate, formValidation};
