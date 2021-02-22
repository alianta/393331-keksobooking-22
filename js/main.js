import {getRandomArrayAdvertisements} from './data.js'
import {showCard} from './show-card.js';

const RANDOM_OBJECTS_COUNT = 10;
const adCards = getRandomArrayAdvertisements(RANDOM_OBJECTS_COUNT)
showCard(adCards[0]);
