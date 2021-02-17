const TYPES = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);

const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');

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
  const cardFeatures = adCardElement.querySelector('.popup__features');
  const cardFeature = adCardElement.querySelector('.popup__feature');
  while (cardFeatures.firstChild) {
    cardFeatures.removeChild(cardFeatures.firstChild);
  }
  data.offer.features.forEach((feature) => {
    const newFeature = cardFeature.cloneNode(true);
    newFeature.setAttribute('class', 'popup__feature popup__feature--'+feature);
    cardFeatures.appendChild(newFeature);
  });

  adCardElement.querySelector('.popup__description').textContent = data.offer.description;

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

export {showCard};
