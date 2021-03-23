import {formChangeOnUserInput} from './form-change-on-user-input.js';
import {formDisable, mapFiltersDisable, formValidation} from './form.js';
import {getAdvertisments} from './processing-server-data.js';
import {loadMap, createCommonMarkers} from './map.js';
import {submitForm} from './form-submit.js';
import {resetForm} from './form-reset.js';
import {addModalWindows} from './modal.js';
import {houseTypeChange, priceChange, roomsChange, guestsChange} from './advertisement-filter.js';

addModalWindows();
formValidation();
formDisable();
mapFiltersDisable();
loadMap();
formChangeOnUserInput();

getAdvertisments((advertisments) => {
  createCommonMarkers(advertisments);
  houseTypeChange(() => createCommonMarkers(advertisments));
  priceChange(() => createCommonMarkers(advertisments));
  roomsChange(() => createCommonMarkers(advertisments));
  guestsChange(() => createCommonMarkers(advertisments));
});

submitForm();
resetForm();

