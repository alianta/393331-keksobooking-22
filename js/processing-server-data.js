const serverAddress = 'https://22.javascript.pages.academy/keksobooking/data';

/**
 * Функция получает данные с объявлениями с сервера и отрисовывает их на карте
 */
const getAdvertisments = (onSuccess) => {
  fetch(serverAddress)
    .then((response) => response.json())
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      //отобразить сообщение что данные не подгрузились
      const map = document.querySelector('.map')
      const mapErrorMessage = document.createElement('div');
      mapErrorMessage.id = 'map-error';
      mapErrorMessage.style.cssText = 'background-color: red; font-size: 26px; position: absolute; z-index:1000;';
      mapErrorMessage.textContent = 'Ошибка загрузки карты';
      map.appendChild(mapErrorMessage);
    });
}

export {getAdvertisments};
