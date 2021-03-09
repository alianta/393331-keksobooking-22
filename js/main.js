import {formChangeOnUserInput} from './form-change-on-user-input.js';
import {formDisable, mapFiltersDisable} from './form.js';
import {getRandomArrayAdvertisements} from './data.js';
import {loadMap, createCommonMarkers} from './map.js';

const ADVERTISEMENT_COUNT = 10;

formDisable();
mapFiltersDisable();
loadMap();
formChangeOnUserInput();

const advertisements = getRandomArrayAdvertisements(ADVERTISEMENT_COUNT);
createCommonMarkers(advertisements);
