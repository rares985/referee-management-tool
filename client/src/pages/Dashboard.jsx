import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars 
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Clock, PersonBoundingBox, Calendar, BoxArrowLeft } from '../components/Icons';

import { FetchUserRights, LogoutUser } from '../actions/DashboardActions';

// eslint-disable-next-line no-unused-vars 
import DismissibleHelper from '../components/DismissibleHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

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

    const { doLogoutUser } = props;

    doLogoutUser({
      username: user
    });

    navigate('/login');
  };

  const baseCards = [
    {
      title: "Istoric meciuri",
      text: "Vizualizează meciurile la care ai fost delegat",
      buttonLabel: "Vizualizează",
      path: "/viewhistory",
      icon: <Clock />,
    },
    {
      title: "Actualizează date",
      text: "Acualizează datele tale cu caracter personal",
      buttonLabel: "Acualizează",
      path: "/updateinfo",
      icon: <PersonBoundingBox />,
    },
    {
      title: "Adaugă perioade",
      text: "Adaugă perioade de indisponbilitate",
      buttonLabel: "Adaugă",
      path: "/addunavailable",
      icon: <Calendar />,
    },
    {
      title: "Actualizează date",
      text: "Acualizează datele tale cu caracter personal",
      buttonLabel: "Acualizează",
      path: "/addunavailable",
      icon: <PersonBoundingBox />,
    },

    rights.delegation && {
      title: "Vizualizare delegari",
      text: "Vizualizeaza si propune noi delegari",
      buttonLabel: "Creeaza",
      path: "/delegate",
      icon: <Calendar />
    },

    rights.approval && {
      title: "Vizualizare propuneri",
      text: "Aproba sau respinge propuneri de delegare",
      buttonLabel: "Aproba",
      path: "/approvedrafts",
      icon: <Calendar />
    },

    rights.team && {
      title: "Vizualizare echipa",
      text: "Vizualizeaza informatii despre echipa mea",
      buttonLabel: "Vizualizeaza",
      path: "/team",
      icon: <Calendar />
    },
    {
      title: "Deautentificare",
      text: "Deautentificați-vă de pe site",
      buttonLabel: "Deautentificare",
      path: "/logout",
      icon: <BoxArrowLeft />,
      onClick: handleLogout,
    },
  ]

  /* to filter out false elements introduced by split above */
  const allCards = baseCards.filter(elem => elem);
  const classes = useStyles();

  return (
    <>
      {loading && <CircularProgress />}
      {!loading &&
        <div className={classes.root}>
          <Grid container spacing={3}>
            {allCards.map((card) => (
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <div className="personalized-card">
                  <Card border="dark" style={{ width: '18rem' }}>
                    <div className="avatar">
                      {card.icon}
                    </div>
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>{card.text}</Card.Text>
                      <Button variant="primary" onClick={() => (card.onClick ? card.onClick() : navigate(card.path))}>
                        {card.buttonLabel}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      }
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
