import React from 'react';
import loadingImage from './LoadingGif.gif';

const Loading = () => {
  return (
    <div
      style={{
        width: '100%',
        height: 0,
        paddingBottom: '%50',
        position: 'relative',
      }}
    >
      <img src={loadingImage} style={{ marginTop: '50px' }} />
    </div>
  );
};

export default Loading;
