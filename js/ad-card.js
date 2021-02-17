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

/**
 * Функция создания и показа карточки по html шаблону
 * data {obkect} - объект, содержащий данные, которые необходимо вставить в карточку
 */
const showCard = (data) => {
  const adCardElement = adCardTemplate.cloneNode(true);
  adCardElement.querySelector('.popup__avatar').src = data.author.avatar;
  adCardElement.querySelector('.popup__title').textContent = data.offer.title;
  adCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  adCardElement.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  adCardElement.querySelector('.popup__type').textContent = TYPES.get(data.offer.type);
  adCardElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  adCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  //features - не ясно как это отображать (скрыть неактивные)
  if (!data.offer.features.includes('wifi')) {
    adCardElement.querySelector('.popup__feature--wifi').style.display = 'none';
  }
  if (!data.offer.features.includes('dishwasher')) {
    adCardElement.querySelector('.popup__feature--dishwasher').style.display = 'none';
  }
  if (!data.offer.features.includes('parking')) {
    adCardElement.querySelector('.popup__feature--parking').style.display = 'none';
  }
  if (!data.offer.features.includes('washer')) {
    adCardElement.querySelector('.popup__feature--washer').style.display = 'none';
  }
  if (!data.offer.features.includes('elevator')) {
    adCardElement.querySelector('.popup__feature--elevator').style.display = 'none';
  }
  if (!data.offer.features.includes('conditioner')) {
    adCardElement.querySelector('.popup__feature--conditioner').style.display = 'none';
  }

  adCardElement.querySelector('.popup__description').textContent = data.offer.description;

  //popup__photos - не ясно как это - Я копировала шиблон img и добавила ещё такие же, но с другими адресами
  const cardPhotos = adCardElement.querySelector('.popup__photos')
  const cardPhoto = cardPhotos.querySelector('.popup__photo');
  cardPhoto.remove();
  data.offer.photos.forEach((photo) => {
    const newPhoto = cardPhoto.cloneNode(true);
    newPhoto.src = photo;
    cardPhotos.appendChild(newPhoto);
  });
  map.appendChild(adCardElement);
}

showCard(adCards[0]);
