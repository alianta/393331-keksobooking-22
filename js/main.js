import {formChangeOnUserInput} from './form-change-on-user-input.js';
import {formDisable, mapFiltersDisable, formValidation} from './form.js';
import {getAdvertisments} from './processing-server-data.js';
import {loadMap} from './map.js';
import {submitForm} from './form-submit.js';
import {resetForm} from './form-reset.js';
import {addModalWondows} from './modal.js';

//const ADVERTISEMENT_COUNT = 10;
addModalWondows();
formValidation();
formDisable();
mapFiltersDisable();
loadMap();
formChangeOnUserInput();

getAdvertisments();
submitForm();
resetForm();
