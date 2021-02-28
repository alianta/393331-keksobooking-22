/* global L:readonly */
import {formActive, mapFiltersActive} from './form.js';

/**
 * Функция загрузки интерактивной карты
 */
const loadMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      formActive();
      mapFiltersActive();
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

  mainPinMarker.addTo(map);
}

export {loadMap};
