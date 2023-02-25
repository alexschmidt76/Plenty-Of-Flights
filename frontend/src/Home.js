import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const Home = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block mx-auto shadow p-3 rounded"
          src="../pin.jpg"
          alt="pin"
        />
        <Carousel.Caption style={{color:'black'}}>
          <h3>Select Your Current Location</h3>
          <p>Start by selecting your current location</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto shadow p-3 rounded"
          src="../landing.jpg"
          alt="landing airplane"
        />

        <Carousel.Caption>
          <h3>Select Your Final Destination</h3>
          <p>Then select your final destination</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto shadow p-3 rounded"
          src="../flights.jpg"
          alt="arrows"
        />

        <Carousel.Caption>
          <h3>Finally</h3>
          <p>Choose Your Flight among PLENTY-OF-FLIGHTS</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;