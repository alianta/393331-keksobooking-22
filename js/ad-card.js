import {getRandomArrayAdvertisements} from './data.js';
const RANDOM_AD_CARD_COUNT = 10;
const TYPES = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);

const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');
const adCards = getRandomArrayAdvertisements(RANDOM_AD_CARD_COUNT);

const adCardFragment = document.createDocumentFragment();

adCards.forEach((card)=>{
  const adCardElement = adCardTemplate.cloneNode(true);
  adCardElement.querySelector('.popup__avatar').src = card.author.avatar;
  adCardElement.querySelector('.popup__title').textContent = card.offer.title;
  adCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  adCardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  adCardElement.querySelector('.popup__type').textContent = TYPES.get(card.offer.type);
  adCardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  adCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  //features - не ясно как это отображать (скрыть неактивные)
  if (!card.offer.features.includes('wifi')) {
    adCardElement.querySelector('.popup__feature--wifi').style.display = 'none';
  }
  if (!card.offer.features.includes('dishwasher')) {
    adCardElement.querySelector('.popup__feature--dishwasher').style.display = 'none';
  }
  if (!card.offer.features.includes('parking')) {
    adCardElement.querySelector('.popup__feature--parking').style.display = 'none';
  }
  if (!card.offer.features.includes('washer')) {
    adCardElement.querySelector('.popup__feature--washer').style.display = 'none';
  }
  if (!card.offer.features.includes('elevator')) {
    adCardElement.querySelector('.popup__feature--elevator').style.display = 'none';
  }
  if (!card.offer.features.includes('conditioner')) {
    adCardElement.querySelector('.popup__feature--conditioner').style.display = 'none';
  }

  adCardElement.querySelector('.popup__description').textContent = card.offer.description;

  //popup__photos - не ясно как это - Я копировала шиблон img и добавила ещё такие же, но с другими адресами
  const cardPhotos = adCardElement.querySelector('.popup__photos')
  const cardPhoto = cardPhotos.querySelector('.popup__photo');
  card.offer.photos.forEach((photo) => {
    const newPhoto = cardPhoto.cloneNode(true);
    newPhoto.src = photo;
    cardPhotos.appendChild(newPhoto);
  });

  adCardFragment.appendChild(adCardElement);
});

map.appendChild(adCardFragment.firstChild);
