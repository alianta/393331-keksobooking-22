/* global L:readonly */
import {formActive, mapFiltersActive, showCoordinate} from './form.js';
import {getRandomArrayAdvertisements} from './data.js';
import {createCard} from './create-card.js';

const map = L.map('map-canvas');
const COORDINATE_PRECISION = 5;
const ADVERTISEMENT_COUNT = 10;
const mainPinIcon = L.icon({
  iconUrl: './leaflet/images/marker-icon.png',
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
    lat: 35.6894,
    lng: 139.692,
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
    const currentCoordinate = mainPinMarker.getLatLng();
    showCoordinate(`${currentCoordinate.lat.toFixed(COORDINATE_PRECISION)}, ${currentCoordinate.lng.toFixed(COORDINATE_PRECISION)}`);
  })
    .setView({
      lat: 35.6894,
      lng: 139.692,
    }, 10);

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
 */
const createCommonMarkers = () => {
  const advertisements = getRandomArrayAdvertisements(ADVERTISEMENT_COUNT);
  advertisements.forEach((ad) => {
    addMarkerToMap(new L.marker(
      {
        lat: ad.location.x,
        lng: ad.location.y,
      },
      {
        draggable: false,
        icon: commonPinIcon,
      },
    ),createCard(ad));
  })
}

addMarkerToMap(mainPinMarker);
createCommonMarkers();

export {loadMap};
