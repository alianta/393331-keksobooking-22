import {clearFilter, clearForm} from './form.js';
import {resetMainMarker} from './map.js';

const form = document.querySelector('.ad-form');

const resetForm = () => {
  form.addEventListener('reset', (evt) => {
    evt.preventDefault();
    clearFilter();
    clearForm();
    resetMainMarker();
  });
}
export {resetForm};
