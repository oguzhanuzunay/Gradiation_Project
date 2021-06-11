import React from 'react';
import './StartRide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from '../Search/Search';
import Locate from '../Locate/Locate.jsx';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Draggable from 'react-draggable';
import random from 'random';
import data from '../Map/Locations.json';

const calculateDistanceWithEuclidean = (cord1, cord2) => {
  let distance = Math.hypot(cord1.x - cord2.x, cord1.y - cord2.y);
  console.log('distance :', distance * 100);
  return distance * 100;
};

const getLocations = (startPoint, endPoint) => {
  //long=x,lat=y
  const calculateMiddlePoint = (cord1, cord2) => {
    let distanceX = cord1.x + cord2.x;
    let distanceY = cord1.y + cord2.y;

    let middlePointX = distanceX / 2;
    let middlePointY = distanceY / 2;
    console.log(`Orta Nokta \nX: ${middlePointX} \nY: ${middlePointY}`);

    return { lat: middlePointX, lng: middlePointY };
  };

  const middlePoint = calculateMiddlePoint(startPoint, endPoint);

  // setMarkers((current) => [...current, cordinateList]);
  // console.log(cordinateList);

  //data.response = (location) => {};
  return middlePoint;
};

const randomGenerator = (startPoint, endPoint) => {
  console.table([startPoint, endPoint]);
  let arr = [];

  let counter = 0;
  for (let i = 0; i < 30; i++) {
    counter++;

    if (startPoint.x < endPoint.x) {
      var x = random.float(endPoint.x, startPoint.x);
    } else {
      var x = random.float(startPoint.x, endPoint.x);
    }

    if (startPoint.y < endPoint.y) {
      var y = random.float(endPoint.y, startPoint.y);
    } else {
      var y = random.float(startPoint.y, endPoint.y);
    }

    arr.push({
      lat: x,
      lng: y,
      time: new Date(86400000 + counter),
      info: 'asd',
    });
  }
  console.log(arr);
  return arr;
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
  setCircleRender,
  setCircleCenter,
  changeRadius,
  onDataLoadShowMarker,
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
              setCircleRender(true);
              changeRadius(0);
              changeRadius(
                calculateDistanceWithEuclidean(cordinate1, cordinate2) * 437
              );
              setCircleCenter(getLocations(cordinate1, cordinate2));
              onDataLoadShowMarker(randomGenerator(cordinate1, cordinate2));
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
