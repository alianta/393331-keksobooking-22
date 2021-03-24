import {clearFilter, clearForm} from './form.js';
import {resetMainMarker, createCommonMarkers} from './map.js';

const form = document.querySelector('.ad-form');

const resetForm = (ad) => {
  form.addEventListener('reset', (evt) => {
    evt.preventDefault();
    clearFilter();
    clearForm();
    resetMainMarker();
    createCommonMarkers(ad);
  });
}
export {resetForm};
