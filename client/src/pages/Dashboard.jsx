import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import DashboardItem from './dashboard/DashboardItem';

import {
  Clock,
  PersonBoundingBox,
  Calendar,
  BoxArrowLeft,
  ListCheck,
  List,
} from '../components/Icons';

import { FetchUserRights, LogoutUser } from '../actions/DashboardActions';

// eslint-disable-next-line no-unused-vars
import DismissibleHelper from '../components/DismissibleHelper';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const mapStateToProps = (state) => ({
  user: state.login.user,
  rights: state.user.rights,
  loading: state.user.loading,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  doFetchUserRights: (request) => {
    dispatch(FetchUserRights(request));
  },
  doLogoutUser: (request) => {
    dispatch(LogoutUser(request));
  },
});

const Dashboard = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { user, rights, loading, error } = props;

  useEffect(() => {
    const { doFetchUserRights } = props;
    if (loading) {
      doFetchUserRights({
        username: user,
      });
    }
  });

  const handleLogout = () => {
    const { doLogoutUser } = props;

    doLogoutUser({
      username: user,
    });

    navigate('/login');
  };

  const baseCards = [
    {
      title: 'Istoric meciuri',
      text: 'Vizualizează un istoric al meciurilor la care ai fost delegat',
      buttonLabel: 'Vizualizează',
      path: '/viewhistory',
      icon: <Clock />,
    },
    {
      title: 'Date personale',
      text: 'Actualizează datele tale cu caracter personal',
      buttonLabel: 'Actualizează',
      path: '/updateinfo',
      icon: <PersonBoundingBox />,
    },
    {
      title: 'Perioade de indisponibilitate',
      text: 'Vezi perioadele tale de indisponibilitate și modifică-le',
      buttonLabel: 'Adaugă',
      path: '/addunavailable',
      icon: <Calendar />,
    },

    rights.delegation && {
      title: 'Vizualizare delegări',
      text: 'Vizualizează și propune noi delegări',
      buttonLabel: 'Creează',
      path: '/delegate',
      icon: <List />,
    },

    rights.approval && {
      title: 'Aprobă/Respinge propuneri',
      text: 'Aproba sau respinge propuneri de delegare',
      buttonLabel: 'Aproba',
      path: '/approvedrafts',
      icon: <ListCheck />,
    },

    rights.team && {
      title: 'Vizualizare echipă',
      text: 'Vizualizeaza informații despre echipa mea',
      buttonLabel: 'Vizualizează',
      path: '/team',
      icon: <Calendar />,
    },
    {
      title: 'Deautentificare',
      text: 'Deautentificați-vă de pe site',
      buttonLabel: 'Deautentificare',
      path: '/logout',
      icon: <BoxArrowLeft />,
      onClick: handleLogout,
    },
  ];

  /* to filter out false elements introduced by split above */
  const allCards = baseCards.filter((elem) => elem);
  const classes = useStyles();

  return (
    <CssBaseline>
      {loading && <CircularProgress />}
      {!loading && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            {allCards.map((card) => (
              <Grid item key={card.title} xs={12} sm={9} md={8} lg={4}>
                <DashboardItem
                  icon={card.icon}
                  title={card.title}
                  text={card.text}
                  path={card.path}
                  buttonLabel={card.buttonLabel}
                  onClick={() => (card.onClick ? card.onClick() : navigate(card.path))}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </CssBaseline>
  );
};

Dashboard.propTypes = {
  user: PropTypes.string.isRequired,
  rights: PropTypes.shape({
    delegation: PropTypes.bool.isRequired,
    approval: PropTypes.bool.isRequired,
    team: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  doFetchUserRights: PropTypes.func.isRequired,
  doLogoutUser: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Dashboard.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
