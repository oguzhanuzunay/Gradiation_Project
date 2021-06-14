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

export const infoText = [
  'At TN-248/Peytonsville Rd/Exit 61 - Accident. Right lane blocked.',
  'At Magic Mountain Pky - Accident. Hard shoulder blocked.',
  'Restrictions due to accident on US-92 at Bethlehem Rd.',
  'At Northwest Hwy/Exit 11 - Accident.',
  'Accident on Fort Lowell Rd at Avenida del Clarin.',
  'At I-287/W Oakland Ave - Accident.',
  'Accident on Westpark Dr at 14th St.',
  'Accident on CA-2 Southbound at Exit 13 I-5.',
  'Incident on SIERRA AVE near LYTLE CREEK RD Expect delays.',
  'Incident on I-94 WB near I-696 Drive with caution.',

  'Lane blocked due to accident on I-285 Eastbound at Exit 29 Ashford Dunwoody Rd.',
  'Accident on US-401 Main St Northbound at NC-42 NC 55 Hwy.',
  'Accident on Chimney Rock Rd at US-90 Alt Main St.',
  'At McLean Ave/Exit 3 - Accident. Left lane blocked.',
  'Lane blocked due to accident on I-680 Northbound at Exit 53 CA-4.',
  'Accident on I-26 Eastbound at Exit 213B Montague Ave.',
  'Accident on Research Blvd Southbound at Pavilion Blvd.',
  'At CA-22/Garden Grove Fwy - Accident.',
  'Accident on 17 Mile Rd at Stout Ave.',
  'Accident on I-90 Eastbound at Exit 48A.',
];
