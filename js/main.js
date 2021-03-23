import {formChangeOnUserInput} from './form-change-on-user-input.js';
import {formDisable, mapFiltersDisable, formValidation} from './form.js';
import {getAdvertisments} from './processing-server-data.js';
import {loadMap, createCommonMarkers} from './map.js';
import {submitForm} from './form-submit.js';
import {resetForm} from './form-reset.js';
import {addModalWindows} from './modal.js';
import {changeUserForm} from './advertisement-filter.js';

addModalWindows();
formValidation();
formDisable();
mapFiltersDisable();
loadMap();
formChangeOnUserInput();

getAdvertisments((advertisments) => {
  createCommonMarkers(advertisments);
  changeUserForm(advertisments);
});

submitForm();
resetForm();
