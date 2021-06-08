import React, { useState } from 'react';
import Map from '../../Map/Map';
import './Hero.css';

const Hero = ({ handleLogOut }) => {
  const [startRide, setStartRide] = useState(true);
  const [response, setResponse] = useState(null);

  let closeRide = () => {
    setStartRide(false);
  };

  return (
    <>
      <section className="hero">
        <nav>
          <div className="cont">
            <h2>Welcome</h2>
            <button className="purpleButton">Map</button>
            <button
              className="purpleButton"
              onClick={() => {
                setStartRide(true);
               // setResponse(null);
              }}
            >
              Start
            </button>
          </div>
          <div className="cont right">
            <button className="purpleButton" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </nav>
        <Map
          startRide={startRide}
          closeRide={closeRide}
          setStartRide={setStartRide}
          response={response}
          setResponse={setResponse}
        />
      </section>
    </>
  );
};

export default Hero;
