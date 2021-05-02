import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './StartRide.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StartRide = () => {
  return (
    <Card
      className="card"
      style={{
        borderColor: '#603bbb !important',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1',
      }}
    >
      <Card.Header>
        <h1>Start Ride</h1>
      </Card.Header>
      <Card.Body className="m2">
        <Card.Title>Start Ride</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StartRide;
