import React, { useState } from 'react';
import Loading from '../../Loading/Loading.jsx';
import Map from '../../Map/Map';
import './Hero.css';

const Hero = ({ handleLogOut }) => {
  const [startRide, setStartRide] = useState(true);

  let closeRide = () => {
    setStartRide(false);
  };

  return (
    <>
      <section className="hero">
        <nav>
          <div className="cont">
            <h2>Drive Safe</h2>
            <button className="purpleButton">Map</button>
            <button className="purpleButton" onClick={() => setStartRide(true)}>
              Start
            </button>
          </div>
          <div className="cont right">
            <button className="purpleButton" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </nav>
        <Map startRide={startRide} closeRide={closeRide} />
      </section>
    </>
  );
};

export default Hero;
