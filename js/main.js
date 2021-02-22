import {getRandomArrayAdvertisements} from './data.js';
import {showCard} from './show-card.js';
import {formChangeOnUserInput} from './form-change-on-user-input.js';

const RANDOM_OBJECTS_COUNT = 10;
const adCards = getRandomArrayAdvertisements(RANDOM_OBJECTS_COUNT)
showCard(adCards[0]);
formChangeOnUserInput();
