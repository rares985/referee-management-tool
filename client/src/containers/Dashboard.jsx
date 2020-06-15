import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Clock, PersonBoundingBox, Calendar, BoxArrowLeft, getIcon } from '../components/Icons';

const axios = require('axios').create({
  baseURL: process.env.API_ENDPOINT
});

/* eslint-disable */

const DashboardLink = (props) => {
  return (
    <div className="personalized-card">
      <Card border="dark" style={{ width: '18rem' }}>
        <div className="avatar">
          {getIcon(props.iconName)}
        </div>
        <Card.Body>
          <Card.Title>{props.cardTitle}</Card.Title>
          <Card.Text>{props.cardText}</Card.Text>
          <Button variant="primary" onClick={() => props.cardButtonAction()}>
            {props.buttonText}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}



const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasDelegationRights, setHasDelegationRights] = useState(false);
  const [hasApprovalRights, setHasApprovalRights] = useState(false);
  const [hasTeamRights, setHasTeamRights] = useState(false);

  useEffect(() => {
    if (isLoading) {
      axios
        .get('/api/userinfo', {
          params: {
            username: props.authenticatedUser
          }
        })
        .then(resp => {
          console.log(resp);
          setIsLoading(false);
          setHasApprovalRights(resp.data.HasApprovalRights);
          setHasDelegationRights(resp.data.HasDelegationRights);
          setHasTeamRights(resp.data.HasTeamRights);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  const handleLogout = () => {
    props.logoutCallback(false);
    axios
      .get('/api/logout')
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.error(err);
      });

    props.userCallback('');
    props.navigate('/login');
  };

  return (
    <div className="page-container" >
      {isLoading && <Spinner animation="border" />}
      {!isLoading &&
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

            {hasDelegationRights &&
              <Col>
                <div className="personalized-card">
                  <Card border="dark" style={{ width: '18rem' }}>
                    <div className="avatar">
                      <BoxArrowLeft />
                    </div>
                    <Card.Body>
                      <Card.Title>Delegare </Card.Title>
                      <Card.Text>Propuneți arbitri pentru delegare</Card.Text>
                      <Button variant="primary" onClick={() => props.navigate('/proposedrafts')}>
                        Delegă
                  </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>}

            {hasApprovalRights &&
              <Col>
                <div className="personalized-card">
                  <Card border="dark" style={{ width: '18rem' }}>
                    <div className="avatar">
                      <BoxArrowLeft />
                    </div>
                    <Card.Body>
                      <Card.Title>Aprobă delegări </Card.Title>
                      <Card.Text>Vizualizați și aprobați delegări pentru arbitri</Card.Text>
                      <Button variant="primary" onClick={() => props.navigate('/approvedrafts')}>
                        Vizualizare
                  </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>}

            {hasApprovalRights &&
              <Col>
                <div className="personalized-card">
                  <Card border="dark" style={{ width: '18rem' }}>
                    <div className="avatar">
                      <BoxArrowLeft />
                    </div>
                    <Card.Body>
                      <Card.Title>Echipa mea </Card.Title>
                      <Card.Text>Vizualizați și aprobați informații despre echipa dvs.</Card.Text>
                      <Button variant="primary" onClick={() => props.navigate('/approvedrafts')}>
                        Vizualizare
                  </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>}
          </Row>
        </Container>
      }
    </div >
  );
};

/* eslint-enable */

export default Dashboard;
