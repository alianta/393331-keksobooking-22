const TYPES = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
]);

const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * Функция создания карточки по html шаблону.
 * @param {object} data  - объект, содержащий данные, которые необходимо вставить в карточку
 * @returns {htmlelement} - html элемент - карточка, созданнная по шаблону
 */
const createCard = (data) => {
  const advertisementCardElement = advertisementCardTemplate.cloneNode(true);
  advertisementCardElement.querySelector('.popup__avatar').src = data.author.avatar;
  advertisementCardElement.querySelector('.popup__title').textContent = data.offer.title;
  advertisementCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  advertisementCardElement.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  advertisementCardElement.querySelector('.popup__type').textContent = TYPES.get(data.offer.type);
  advertisementCardElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  advertisementCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  const cardFeatures = advertisementCardElement.querySelector('.popup__features');
  const cardFeature = advertisementCardElement.querySelector('.popup__feature');

  while (cardFeatures.firstChild) {
    cardFeatures.removeChild(cardFeatures.firstChild);
  }

  if(data.offer.features.length === 0) {
    cardFeatures.remove();
  } else {
    data.offer.features.forEach((feature) => {
      const newFeature = cardFeature.cloneNode(true);
      newFeature.setAttribute('class', 'popup__feature popup__feature--'+feature);
      cardFeatures.appendChild(newFeature);
    });
  }
  
  advertisementCardElement.querySelector('.popup__description').textContent = data.offer.description;

  const cardPhotos = advertisementCardElement.querySelector('.popup__photos');
  const cardPhoto = cardPhotos.querySelector('.popup__photo');

  if(data.offer.photos.length === 0) {
    cardPhotos.remove();
  } else {
    cardPhoto.remove();
    data.offer.photos.forEach((photo) => {
      const newPhoto = cardPhoto.cloneNode(true);
      newPhoto.src = photo;
      cardPhotos.appendChild(newPhoto);
    });
  }
  
  return advertisementCardElement;
}

export {createCard};
