import React from 'react';

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
            onPositionSelect(lat, lng, '/marker-green.png', 'start');
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
};

export default Locate;
