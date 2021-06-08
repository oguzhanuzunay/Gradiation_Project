import React from 'react';
import './StartRide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from '../Search/Search';
import Locate from '../Locate/Locate.jsx';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Draggable from 'react-draggable';
import data from '../Map/Locations.json';

const getLocations = (startPoint, endPoint) => {
  //long=x,lat=y
  

  data.response = (location) => {

  };
};

const StartRide = ({
  closeRide,
  panTo,
  setCordinate1,
  setCordinate2,
  onPositionSelect,
  clearOldPoint,
  setOrigin,
  setDestination,
  setLimit,
  onFinishSelect,
  clearAllPoint,
  cordinate1,
  cordinate2,
}) => {
  return (
    <Draggable>
      <Card
        className="card"
        style={{
          opacity: 0.85,
          borderColor: '#603bbb !important',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '1',
          border: 'solid 5px #603bbb',
        }}
      >
        <Card.Header
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h1>Start Ride</h1>
          <button
            style={{
              color: '#603bbb',
              border: '0',
              backgroundColor: 'rgba(255,0,0,0)',
              height: '20px',
              right: '12px',
              top: '0px',
              padding: '0px',
              fontWeight: '900',
            }}
            onClick={() => closeRide()}
          >
            X
          </button>
        </Card.Header>
        <Card.Body className="m2">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Choose a starting location.</Form.Label>

            <Row>
              <Col sm={10}>
                <Search
                  panTo={panTo}
                  type={'startPoint'}
                  setCordinate1={setCordinate1}
                  setCordinate2={setCordinate2}
                  onPositionSelect={onPositionSelect}
                  clearOldPoint={clearOldPoint}
                  setOrigin={setOrigin}
                  setDestination={setDestination}
                  setLimit={setLimit}
                />
              </Col>
              <Col sm={2} style={{ padding: '0px' }}>
                <Locate
                  setLimit={setLimit}
                  panTo={panTo}
                  setCordinate1={setCordinate1}
                  clearOldPoint={clearOldPoint}
                  onPositionSelect={onPositionSelect}
                  setOrigin={setOrigin}
                  setDestination={setDestination}
                />
              </Col>
            </Row>

            <Form.Text className="text-muted">
              Choose your starting location for driving
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Choose destination location</Form.Label>
            <Search
              style={{ margin: '20px', top: '3rem' }}
              type={'endPoint'}
              panTo={panTo}
              setCordinate1={setCordinate1}
              setCordinate2={setCordinate2}
              onFinishSelect={onFinishSelect}
              clearOldPoint={clearOldPoint}
              setOrigin={setOrigin}
              setDestination={setDestination}
              setLimit={setLimit}
            />
            <Form.Text className="text-muted">
              Choose your destination for driving{' '}
            </Form.Text>
          </Form.Group>
          <Button
            clearAllPoint={clearAllPoint}
            variant="primary"
            style={{ backgroundColor: '#603bbb', borderColor: '#603bbb' }}
            type="submit"
            size="lg"
            type="calculateDistance"
            block
            clearOldPoint={clearOldPoint}
            onClick={() => {
              closeRide(true);
              clearAllPoint();
              getLocations(cordinate1, cordinate2);
              setOrigin({
                lat: parseFloat(cordinate1.x),
                lng: parseFloat(cordinate1.y),
              });
              setDestination({
                lat: parseFloat(cordinate2.x),
                lng: parseFloat(cordinate2.y),
              });
            }}
          >
            Submit
          </Button>
        </Card.Body>
      </Card>
    </Draggable>
  );
};

export default StartRide;
