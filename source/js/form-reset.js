import {clearFilter, clearForm} from './form.js';
import {resetMainMarker, createCommonMarkers} from './map.js';

const form = document.querySelector('.ad-form');

/**
 * Фцнкция добавления обработчика события "сборс значений в исходное состояние"
 * @param {array} advertisements - массив объявлений
 */
const resetForm = (advertisements) => {
  form.addEventListener('reset', (evt) => {
    evt.preventDefault();
    clearFilter();
    clearForm();
    createCommonMarkers(advertisements);
    resetMainMarker();
  });
}
export {resetForm};
