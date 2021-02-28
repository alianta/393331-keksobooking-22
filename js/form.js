const formDisable = () => {
  const form = document.querySelector('.ad-form');
  form.classList.add('ad-form--disabled');
  const formInteractivElements = form.querySelectorAll('fieldset');

  formInteractivElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

const mapFiltersDisable = () => {
  const mapFilter = document.querySelector('.map__filters');
  mapFilter.classList.add('map__filters--disabled');
  const mapFilterInteractiveElements = mapFilter.querySelectorAll('fieldset, select');

  mapFilterInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

export {formDisable, mapFiltersDisable};
