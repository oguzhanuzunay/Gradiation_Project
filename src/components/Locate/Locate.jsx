import React from 'react';
import greenMarker from '../Map/logos/marker-green.png';
import compass from '../Map/logos/compass.png';

const Locate = ({ panTo, setCordinate1, clearOldPoint, onPositionSelect }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            clearOldPoint('start');
            onPositionSelect(lat, lng, greenMarker, 'start');
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
      <img src={compass} alt="compass - locate me" />
    </button>
  );
};

export default Locate;
