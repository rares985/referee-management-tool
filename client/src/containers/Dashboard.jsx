import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Clock = () => {
  return (
    <svg
      className="bi bi-clock"
      width="5em"
      height="5em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
      />
      <path
        fillRule="evenodd"
        d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  );
};

const PersonBoundingBox = () => {
  return (
    <svg
      className="bi bi-person-bounding-box"
      width="5em"
      height="5em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
      />
      <path
        fillRule="evenodd"
        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      />
    </svg>
  );
};

const Calendar = () => {
  return (
    <svg
      className="bi bi-calendar3"
      width="5em"
      height="5em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
      />
      <path
        fillRule="evenodd"
        d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      />
    </svg>
  );
};

const BoxArrowLeft = () => {
  return (
    <svg
      className="bi bi-box-arrow-left"
      width="5em"
      height="5em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4.354 11.354a.5.5 0 0 0 0-.708L1.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
      />
      <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0 0 1h9a.5.5 0 0 0 .5-.5z" />
      <path
        fillRule="evenodd"
        d="M14 13.5a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 14 2.5H7A1.5 1.5 0 0 0 5.5 4v1.5a.5.5 0 0 0 1 0V4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-1.5a.5.5 0 0 0-1 0V12A1.5 1.5 0 0 0 7 13.5h7z"
      />
    </svg>
  );
};
const Dashboard = (props) => {
  return (
    <div className="page-container">
      <Container>
        <Row xs={1} md={2} lg={3}>
          <Col>
            <div className="personalized-card">
              <Card border="dark" style={{ width: '18rem' }}>
                <div className="avatar">
                  <Clock />
                </div>
                <Card.Body>
                  <Card.Title>Istoric meciuri</Card.Title>
                  <Card.Text>Vizualizează situația meciurilor la care ai fost delegat</Card.Text>
                  <Button variant="primary" onClick={() => props.navigate('/viewhistory')}>
                    Vizualizează
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col>
            <div className="personalized-card">
              <Card border="dark" style={{ width: '18rem' }}>
                <div className="avatar">
                  <PersonBoundingBox />
                </div>
                <Card.Body>
                  <Card.Title>Date personale</Card.Title>
                  <Card.Text>Actualizează date cu caracter personal</Card.Text>
                  <Button variant="primary" onClick={() => props.navigate('/updateinfo')}>
                    Acualizează
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col>
            <div className="personalized-card">
              <Card border="dark" style={{ width: '18rem' }}>
                <div className="avatar">
                  <Calendar />
                </div>
                <Card.Body>
                  <Card.Title>Adaugă indisponibilitate </Card.Title>
                  <Card.Text>Adaugă perioade de indisponbilitate</Card.Text>
                  <Button variant="primary" onClick={() => props.navigate('/addunavailable')}>
                    Adaugă
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col>
            <div className="personalized-card">
              <Card border="dark" style={{ width: '18rem' }}>
                <div className="avatar">
                  <BoxArrowLeft />
                </div>
                <Card.Body>
                  <Card.Title>Deautentificare </Card.Title>
                  <Card.Text>Deautentificați-vă de pe site</Card.Text>
                  <Button variant="primary" onClick={() => props.navigate('/logout')}>
                    Adaugă
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
