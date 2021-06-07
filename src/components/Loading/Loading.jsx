import React from 'react';
import loadingImage from './LoadingGif.gif';
import './loading.css';

const Loading = () => {
  return (
    <div style={{}} className="loadingContainer">
      <img src={loadingImage} style={{ marginTop: '50px' }} />
    </div>
  );
};

export default Loading;
