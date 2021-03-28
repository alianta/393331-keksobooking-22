import {formChangeOnUserInput} from './form-change-on-user-input.js';
import {formDisable, mapFiltersDisable, checkForm} from './form.js';
import {getAdvertisments} from './processing-server-data.js';
import {createCommonMarkers} from './map.js';
import {submitForm} from './form-submit.js';
import {resetForm} from './form-reset.js';
import {addModalWindows} from './modal.js';
import {changeUserForm} from './advertisement-filter.js';
import {chooseAvatar, chooseImage} from './image.js';

formDisable();
mapFiltersDisable();
addModalWindows();
checkForm();
formChangeOnUserInput();

getAdvertisments((advertisments) => {
  createCommonMarkers(advertisments);
  changeUserForm(advertisments);
  resetForm(advertisments);
  submitForm(advertisments);
});

chooseAvatar();
chooseImage();
