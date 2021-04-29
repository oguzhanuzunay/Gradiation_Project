import React from 'react';
import Loading from '../../Loading/Loading.jsx';
import Map from '../../Map/Map';
import './Hero.css';

const Hero = ({ handleLogOut }) => {
  return (
    <>
      <section className="hero">
        <nav>
          <div className="cont">
            <h2>Welcome</h2>
            <button className="purpleButton">Map</button>
          </div>
          <div className="cont right">
            <button className="purpleButton" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </nav>
        <Map />
      </section>
    </>
  );
};

export default Hero;
