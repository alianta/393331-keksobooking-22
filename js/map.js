/* global L:readonly */
import {formActive, mapFiltersActive, showCoordinate} from './form.js';

const COORDINATE_PRECISION = 5;
const mainPinIcon = L.icon({
  iconUrl: './leaflet/images/marker-icon.png',
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
  const map = L.map('map-canvas')
    .on('load', () => {
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

  mainPinMarker
    .on('move', () => {
      const currentCoordinate = mainPinMarker.getLatLng();
      showCoordinate(`${currentCoordinate.lat.toFixed(COORDINATE_PRECISION)}, ${currentCoordinate.lng.toFixed(COORDINATE_PRECISION)}`);
    }).
    addTo(map);
}

export {loadMap};
