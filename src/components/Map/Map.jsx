import React, { useState } from 'react';
import './Map.css';
import Loading from '../Loading/Loading.jsx';
import '../StartRide/StartRide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RideCard from '../StartRide/StartRide';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';

import {
  libraries,
  mapContainerStyle,
  center,
  options,
  cordinateList,
} from './MapOptions';

const Map = ({ startRide, closeRide, setResponse, response }) => {
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

  // -------------------------------------------------------------------------------waiting for backend
  // const calculateDistanceWithEuclidean = (cord1, cord2) => {
  //   let distance = Math.hypot(cord1.x - cord2.x, cord1.y - cord2.y);
  //   console.log('distance :', distance * 100);
  //   let zoomLevel = 4;
  //   return distance;
  // };

  // const calculateMiddlePoint = (cord1, cord2) => {
  //   let distanceX = cord1.x + cord2.x;
  //   let distanceY = cord1.y + cord2.y;

  //   let middlePointX = distanceX / 2;
  //   let middlePointY = distanceY / 2;
  //   console.log(`Orta Nokta \nX: ${middlePointX} \nY: ${middlePointY}`);
  //   calculateDistanceWithEuclidean(cord1, cord2);
  //   return [middlePointX, middlePointY];
  // };

  // setMarkers((current) => [...current, cordinateList]);
  //console.log(cordinateList);
  //--------------------------------------------------------------------------------waiting for backend

  //------------------------

  //----Add to Maker When Click to Map
  // const onMapClick = React.useCallback((event) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date(),
  //       info: 'Zeynep Ehliyet almış \n dikkat et dostum !!!!',
  //     },
  //   ]);
  // }, []);

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
        url: url || '/marker-green.png',
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
        />
      ) : (
        false
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        //    onClick={onMapClick}
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
      </GoogleMap>
    </div>
  );
};

export default Map;
