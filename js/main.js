import {formChangeOnUserInput} from './form-change-on-user-input.js';
import {formDisable, mapFiltersDisable, formValidation} from './form.js';
import {getAdvertisments} from './processing-server-data.js';
import {loadMap,createCommonMarkers} from './map.js';
import {submitForm} from './form-submit.js';
import {resetForm} from './form-reset.js';
import {addModalWondows} from './modal.js';
import {advertisementFilter, houseTypeChange, priceChange, roomsChange, guestsChange} from './advertisement-filter.js';

addModalWondows();
formValidation();
formDisable();
mapFiltersDisable();
loadMap();
formChangeOnUserInput();

getAdvertisments((wizards) => {
  createCommonMarkers(wizards);
  houseTypeChange(() => advertisementFilter(wizards));
  priceChange(() => advertisementFilter(wizards));
  roomsChange(() => advertisementFilter(wizards));
  guestsChange(() => advertisementFilter(wizards));
});

submitForm();
resetForm();

