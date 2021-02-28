/* global L:readonly */
import {formActive, mapFiltersActive} from './form.js';

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

}

export {loadMap};
