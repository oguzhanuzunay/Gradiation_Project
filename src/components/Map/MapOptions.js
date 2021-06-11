import MapStyles from './Map.styles';

export const libraries = ['places'];
export const mapContainerStyle = {
  width: '100%',
  height: '92vh',
};
export const center = {
  lat: 43.653225,
  lng: -79.383186,
};
export const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
export const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.1,
  clickable: false,
  draggable: false,
  editable: false,
  visible: false,
  radius: 0,
  zIndex: 1,
};

export const cordinateList = [
  {
    lat: 43.14506241157973,
    lng: -80.31427730859374,
    time: new Date(86400000 + 1),
    info: 'Accident on Tanner Rd at Pennbrooke Ln.',
  },
  {
    lat: 43.321157725277914,
    lng: -80.75373043359374,
    time: new Date(86400000 + 2),
    info: 'Accident on Houston Branch Rd at Providence Branch Ln.',
  },
  {
    lat: 42.92422789558916,
    lng: -80.96796383203124,
    time: new Date(86400000 + 3),
    info: 'Accident on I-595 Westbound at Exit 4 / Pine Island Rd.',
  },
];
