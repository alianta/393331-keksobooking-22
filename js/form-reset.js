import {clearFilter, clearForm} from './form.js';
const form = document.querySelector('.ad-form');

const resetForm = () => {
  form.addEventListener('reset', (evt) => {
    evt.preventDefault();
    clearFilter();
    clearForm();
  });
}
export {resetForm};