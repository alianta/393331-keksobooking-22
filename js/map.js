/* global L:readonly */
import {formActive, mapFiltersActive, showCoordinate} from './form.js';
import {createCard} from './create-card.js';

const map = L.map('map-canvas');
const LATITUDE = 35.6894;
const LONGITUDE = 139.692;
const MAP_ZOOM = 10;
const COORDINATE_PRECISION = 5;
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const mainPinMarker = L.marker(
  {
    lat: LATITUDE,
    lng: LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

/**
 * Функция загрузки интерактивной карты
 */
const loadMap = () => {
  map.on('load', () => {
    formActive();
    mapFiltersActive();
    mainPinMarker._id = 'main';
    const currentCoordinate = mainPinMarker.getLatLng();
    showCoordinate(`${currentCoordinate.lat.toFixed(COORDINATE_PRECISION)}, ${currentCoordinate.lng.toFixed(COORDINATE_PRECISION)}`);
  })
    .setView({
      lat: LATITUDE,
      lng: LONGITUDE,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);


}

/**
 * Функция добавления маркера на карту
 * @param {Leflet marker} marker  - маркер Leflet
 * @param {text} markerPopup   - информация, выводимя в popup при нажатии на маркер
 */

const addMarkerToMap = (marker, markerPopup = null) => {
  marker.on('move', () => {
    const currentCoordinate = mainPinMarker.getLatLng();
    showCoordinate(`${currentCoordinate.lat.toFixed(COORDINATE_PRECISION)}, ${currentCoordinate.lng.toFixed(COORDINATE_PRECISION)}`);
  }).addTo(map);

  if(markerPopup){
    marker.bindPopup(markerPopup);
  }
}

/**
 * Функция создания маркеров объявлений и добавления их на карту
 * @param {array} advertisements - массив объявлений
 */
const createCommonMarkers = (advertisements) => {
  advertisements.forEach((ad) => {
    createCommonMarker(ad);
  })
}

/**
 * Функция добавлений одного маркера на карту
 * @param {object} ad  - объект с данными для объявления
 */
const createCommonMarker = (ad) => {
  const marker = new L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      draggable: false,
      icon: commonPinIcon,
    },
  );
  marker._id = 'advertisement';
  addMarkerToMap(marker, createCard(ad));
}

addMarkerToMap(mainPinMarker);

/**
 * Функция сброса гавного маркера в исходное состояние
 */
const resetMainMarker = () => {
  map.setView(L.latLng(LATITUDE, LONGITUDE));
  map.setZoom(MAP_ZOOM);
  map.eachLayer((layer) => {
    if (layer._id === 'main') {
      layer.setLatLng([LATITUDE, LONGITUDE]);
    }
  });
}

/**
 * Функция удаления всех маркеров объявлений с карты, кроме главного маркера
 */
const deleteAdvertisementMarkers = () => {
  map.eachLayer((layer) => {
    if (layer._id === 'advertisement') {
      map.removeLayer(layer);
    }
  });
}
export {loadMap, createCommonMarkers, resetMainMarker, deleteAdvertisementMarkers, createCommonMarker};
