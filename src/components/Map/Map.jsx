import React, { useState } from 'react';
import './Map.css';
import Loading from '../Loading/Loading.jsx';
import '../StartRide/StartRide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RideCard from '../StartRide/StartRide';
import greenMarker from './logos/marker-green.png';
import crashLogo from './logos/crash.png';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
  Circle,
} from '@react-google-maps/api';

import {
  libraries,
  mapContainerStyle,
  center,
  options,
  cordinateList,
  circleOptions,
} from './MapOptions';

const changeRadius = (radius) => {
  circleOptions.radius = radius;
};

const Map = ({ startRide, closeRide, setResponse, response }) => {
  const { isLoaded, loadError } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyAfnXHBS80WU5DFMjNhQu9Zb42EdV_41qQ',
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [circleRender, setCircleRender] = useState(false);
  const [circleCenter, setCircleCenter] = useState({});
  const [selected, setSelected] = React.useState(null);
  const [infoText, setInfoText] = React.useState('');
  // Hooks

  const [cordinate1, setCordinate1] = useState({ x: 0, y: 0 });
  const [cordinate2, setCordinate2] = useState({ x: 0, y: 0 });

  //Direction
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [limit, setLimit] = useState(0);

  // functions
  const clearAllPoint = React.useCallback(() => {
    setMarkers(() => []);
  }, []);

  let directionsCallback = (response) => {
    console.log(response);
    if (response !== null && limit < 2) {
      setLimit(limit + 1);
      console.log(limit);
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response);
      }
    }
  };

  //----Add to Maker When Click to Map
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
        info: '',
      },
    ]);
  }, []);

  // Load Traffic Accident
  const onDataLoadShowMarker = React.useCallback((list) => {
    setMarkers((current) => [...current].concat(list));
  }, []);

  const onPositionSelect = React.useCallback((lat, lng, url, type) => {
    setMarkers((current) => [
      ...current,
      {
        lat: lat,
        lng: lng,
        time: new Date(),
        info: `${type} Point`,
        url: url || greenMarker,
        type: type,
      },
    ]);
    console.log(type, lat, lng);
  }, []);

  const onFinishSelect = React.useCallback((lat, lng, url, type) => {
    onPositionSelect(lat, lng, url, type);
  }, []);

  const clearOldPoint = (type) => {
    console.log(markers.map((mark) => mark.type));
    let newMarkers = markers.filter((mark) => mark.type !== type);
    console.log(newMarkers);
    setMarkers(() => [...newMarkers]);
  };

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
        <RideCard
          onDataLoadShowMarker={onDataLoadShowMarker}
          closeRide={closeRide}
          panTo={panTo}
          setCordinate1={setCordinate1}
          setCordinate2={setCordinate2}
          onPositionSelect={onPositionSelect}
          clearOldPoint={clearOldPoint}
          setOrigin={setOrigin}
          setDestination={setDestination}
          setLimit={setLimit}
          onFinishSelect={onFinishSelect}
          clearAllPoint={clearAllPoint}
          cordinate1={cordinate1}
          cordinate2={cordinate2}
          setCircleRender={setCircleRender}
          setCircleCenter={setCircleCenter}
          changeRadius={changeRadius}
        />
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
              url: marker.url || crashLogo,
              scaledSize: new window.google.maps.Size(32, 32),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setInfoText(marker.info);
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

        {circleRender && (
          <Circle center={circleCenter} options={circleOptions} />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
