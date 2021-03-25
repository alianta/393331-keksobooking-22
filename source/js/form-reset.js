import {clearFilter, clearForm} from './form.js';
import {resetMainMarker, createCommonMarkers} from './map.js';

const form = document.querySelector('.ad-form');

const resetForm = (ads) => {
  form.addEventListener('reset', (evt) => {
    evt.preventDefault();
    clearFilter();
    clearForm();
    createCommonMarkers(ads);
    resetMainMarker();
  });
}
export {resetForm};
