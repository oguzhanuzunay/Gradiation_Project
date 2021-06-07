import React, { useEffect, useState } from 'react';
import './Map.css';
import Loading from '../Loading/Loading.jsx';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../StartRide/StartRide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Draggable from 'react-draggable';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';
import MapStyles from './Map.styles';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
//import { formatRelative } from 'date-fns';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '92vh',
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const cordinateList = [
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
var limit = 0;
const Map = ({ startRide, closeRide }) => {
  const { isLoaded, loadError } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyAfnXHBS80WU5DFMjNhQu9Zb42EdV_41qQ',
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [infoText, setInfoText] = React.useState('');
  // Hooks

  const [cordinate1, setCordinate1] = useState({ x: 0, y: 0 });
  const [cordinate2, setCordinate2] = useState({ x: 0, y: 0 });

  //Direction
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [response, setResponse] = useState(null);

  const [closeModal, setCloseModal] = useState(false);
  // development
  const clearAllPoint = React.useCallback(() => {
    setMarkers(() => []);
  }, []);

  let directionsCallback = (response) => {
    console.log(response);
    if (response !== null && limit < 2) {
      limit = limit + 1;
      console.log(limit);
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response);
      }
    }
  };

  const calculateDistanceWithEuclidean = (cord1, cord2) => {
    let distance = Math.hypot(cord1.x - cord2.x, cord1.y - cord2.y);
    console.log('distance :', distance * 100);
    let zoomLevel = 4;
    return distance;
  };

  const calculateMiddlePoint = (cord1, cord2) => {
    let distanceX = cord1.x + cord2.x;
    let distanceY = cord1.y + cord2.y;

    let middlePointX = distanceX / 2;
    let middlePointY = distanceY / 2;
    console.log(`Orta Nokta \nX: ${middlePointX} \nY: ${middlePointY}`);
    calculateDistanceWithEuclidean(cord1, cord2);
    return [middlePointX, middlePointY];
  };

  // setMarkers((current) => [...current, cordinateList]);
  //console.log(cordinateList);

  // Kazaları Yükle
  const onDataLoadShowMarker = React.useCallback((list) => {
    setMarkers((current) => [...current].concat(list));
  }, []);

  //------------------------

  const onMapClick = React.useCallback((event) => {
    //onDataLoadShowMarker(cordinateList);
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
        info: 'Zeynep Ehliyet almış \n dikkat et dostum !!!!',
      },
    ]);
  }, []);

  const onPositionSellect = React.useCallback((lat, lng, url, type) => {
    setMarkers((current) => [
      ...current,
      {
        lat: lat,
        lng: lng,
        time: new Date(),
        info: `${type} Point`,
        url: url || '/marker-green.png',
        type: type,
      },
    ]);
    console.log(type, lat, lng);
  }, []);

  const onFinishSelect = React.useCallback((lat, lng, url, type) => {
    onPositionSellect(lat, lng, url, type);
    console.log(lat, lng, url, type);
  }, []);

  const clearOldPoint = (type) => {
    console.log(markers.map((mark) => mark.type));
    let newMarkers = markers.filter((mark) => mark.type !== type);
    console.log(newMarkers);
    setMarkers(() => [...newMarkers]);
  };

  const onInfoClick = React.useCallback((event) => {
    console.log('Info :', infoText);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    onDataLoadShowMarker(cordinateList);
  }, []);

  const panTo = React.useCallback(({ lat, lng, zoom }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom || 10);
  });

  if (loadError) return 'Error loading Maps';
  if (!isLoaded) return <Loading />;

  return (
    <div>
      {startRide ? (
        <Draggable>
          <Card
            className="card"
            style={{
              opacity: 0.85,
              borderColor: '#603bbb !important',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
              border: 'solid 5px #603bbb',
            }}
          >
            <Card.Header
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <h1>Start Ride</h1>
              <button
                style={{
                  color: '#603bbb',
                  border: '0',
                  backgroundColor: 'rgba(255,0,0,0)',
                  height: '20px',
                  right: '12px',
                  top: '0px',
                  padding: '0px',
                  fontWeight: '900',
                }}
                onClick={() => closeRide()}
              >
                X
              </button>
            </Card.Header>
            <Card.Body className="m2">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Choose a starting location.</Form.Label>

                <Row>
                  <Col sm={10}>
                    <Search
                      panTo={panTo}
                      type={'startPoint'}
                      setCordinate1={setCordinate1}
                      setCordinate2={setCordinate2}
                      onPositionSellect={onPositionSellect}
                      clearOldPoint={clearOldPoint}
                    />
                  </Col>
                  <Col sm={2} style={{ padding: '0px' }}>
                    <Locate
                      panTo={panTo}
                      setCordinate1={setCordinate1}
                      clearOldPoint={clearOldPoint}
                      onPositionSellect={onPositionSellect}
                    />
                  </Col>
                </Row>

                <Form.Text className="text-muted">
                  Choose your starting location for driving
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Choose destination location</Form.Label>
                <Search
                  style={{ margin: '20px', top: '3rem' }}
                  type={'endPoint'}
                  panTo={panTo}
                  setCordinate1={setCordinate1}
                  setCordinate2={setCordinate2}
                  onFinishSelect={onFinishSelect}
                  clearOldPoint={clearOldPoint}

                  /*
                  getCordinateX={getCordinateX}
                  getCordinateY={getCordinateY}
                  */
                />
                <Form.Text className="text-muted">
                  Choose your destination for driving{' '}
                </Form.Text>
              </Form.Group>
              <Button
                clearAllPoint={clearAllPoint}
                variant="primary"
                style={{ backgroundColor: '#603bbb', borderColor: '#603bbb' }}
                type="submit"
                size="lg"
                type="calculateDistance"
                block
                clearOldPoint={clearOldPoint}
                onClick={() => {
                  // closeRide(true);
                  clearAllPoint();
                  setOrigin({
                    lat: parseFloat(cordinate1.x),
                    lng: parseFloat(cordinate1.y),
                  });
                  setDestination({
                    lat: parseFloat(cordinate2.x),
                    lng: parseFloat(cordinate2.y),
                  });
                }}
              >
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Draggable>
      ) : (
        false
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            animation={window.google.maps.Animation.DROP}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: marker.url || '/danger_icon.png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setInfoText(marker.info);
              console.log(infoText);
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Potanciel Crash</h2>
              <p>{infoText}</p>
            </div>
          </InfoWindow>
        ) : null}
        {console.log(startRide)}
        {
          // Direction on Maps
          destination !== '' && origin !== '' && (
            <DirectionsService
              // required
              options={{
                destination: destination,
                origin: origin,
                travelMode: 'DRIVING',
              }}
              // required
              callback={directionsCallback}
              // optional
              onLoad={(directionsService) => {
                console.log(
                  'DirectionsService onLoad directionsService: ',
                  directionsService
                );
              }}
              // optional
              onUnmount={(directionsService) => {
                console.log(
                  'DirectionsService onUnmount directionsService: ',
                  directionsService
                );
              }}
            />
          )
        }

        {response !== null && (
          <DirectionsRenderer
            // required
            options={{
              directions: response,
            }}
            // optional
            onLoad={(directionsRenderer) => {
              console.log(
                'DirectionsRenderer onLoad directionsRenderer: ',
                directionsRenderer
              );
            }}
            // optional
            onUnmount={(directionsRenderer) => {
              console.log(
                'DirectionsRenderer onUnmount directionsRenderer: ',
                directionsRenderer
              );
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

function Locate({ panTo, setCordinate1, clearOldPoint, onPositionSellect }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            clearOldPoint('start');
            onPositionSellect(lat, lng, '/marker-green.png', 'start');
            panTo({
              lat,
              lng,
            });
            setCordinate1({
              x: lat,
              y: lng,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.png" alt="compass - locate me" />
    </button>
  );
}

function Search({
  panTo,
  setCordinate1,
  setCordinate2,
  type,
  onPositionSellect,
  onFinishSelect,
  clearOldPoint,
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.65324, lng: () => -79.3832 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        style={{ zIndex: 2 }}
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            if (type === 'startPoint') {
              clearOldPoint('start');
              setCordinate1({ x: lat, y: lng });
              onPositionSellect(lat, lng, '/marker-green.png', 'start');
            } else {
              clearOldPoint('finish');
              setCordinate2({ x: lat, y: lng });
              onFinishSelect(lat, lng, '/marker-red.png', 'finish');
            }
            panTo({ lat, lng });
            //  console.log(lat, lng);
            // console.log(result[0]);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          style={{ zIndex: 2 }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an Adress"
        />
        <ComboboxPopover style={{ zIndex: 2 }}>
          <ComboboxList style={{ zIndex: 2 }}>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Map;
