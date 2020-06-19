import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */

import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Clock, PersonBoundingBox, Calendar, BoxArrowLeft } from '../components/Icons';

import { FetchUserRights, LogoutUser } from '../actions/DashboardActions';

const mapStateToProps = (state) => ({
  user: state.login.user,
  rights: state.user.rights,
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = (dispatch) => ({
  doFetchUserRights: (request) => {
    dispatch(FetchUserRights(request));
  },
  doLogoutUser: (request) => {
    dispatch(LogoutUser(request));
  }
});



const Dashboard = (props) => {

  // eslint-disable-next-line no-unused-vars
  const { user, rights, loading, error } = props;

  useEffect(() => {
    const { doFetchUserRights } = props;
    if (loading) {
      doFetchUserRights({
        username: user
      });
    }
  });

  const handleLogout = () => {

    const { doLogoutUser, navigate } = props;

    doLogoutUser({
      username: user
    });

    navigate('/login');
  };

  return (
    <div className="page-container" >
      {loading && <Spinner animation="border" />}
      {!loading &&
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

            {rights.delegation &&
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

            {rights.approval &&
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

            {rights.team &&
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
