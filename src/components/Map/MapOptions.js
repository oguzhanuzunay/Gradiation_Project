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

export const cordinateList = [
  {
    lat: 43.14506241157973,
    lng: -80.31427730859374,
    time: new Date(86400000 + 1),
    info: '2 cıkıstaki ısıklara dikkat et',
  },
  {
    lat: 43.321157725277914,
    lng: -80.75373043359374,
    time: new Date(86400000 + 2),
    info: '1. cıkıs sıkıntılı biraz',
  },
  {
    lat: 42.92422789558916,
    lng: -80.96796383203124,
    time: new Date(86400000 + 3),
    info: 'görkem araba sürüyo dikkat et.',
  },
];
