import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import {Clock, PersonBoundingBox, Calendar, BoxArrowLeft} from '../components/Icons';

/* eslint-disable */

const Dashboard = (props) => {
  const handleLogout = () => {
    props.logoutCallback(false);
    props.navigate('/login');
  };
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
                  <Button variant="primary" onClick={() => handleLogout()}>
                    Deautentificare
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

/* eslint-enable */

export default Dashboard;
