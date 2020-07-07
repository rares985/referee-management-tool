/* eslint-disable */
import React, { useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { connect } from 'react-redux';

import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Home from '../pages/Home';
import Matches from '../pages/Matches';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import PersonalInformationForm from '../pages/PersonalInformationForm';
import PersonalMatchHistory from '../pages/PersonalMatchHistory';
import UnavailabilityPeriods from '../pages/UnavailabilityPeriods';
import Team from '../pages/Team';
import Delegate from '../pages/Delegate';
import ApproveDrafts from '../pages/ApproveDrafts';
import WithAuth from '../components/withAuth';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import EventIcon from '@material-ui/icons/Event';
import DashboardIcon from '@material-ui/icons/Dashboard';

const mapStateToProps = (state) => ({
  user: state.login.user,
  finished: state.login.finished,
});

const App = (props) => {
  const links = [
    {
      text: 'Acasă',
      path: '/',
      icon: <HomeIcon />,
    },
    {
      text: 'Meciuri',
      path: '/matches',
      icon: <EventIcon />,
    },
    {
      text: 'Autentificare',
      path: '/login',
      icon: <LockIcon />,
    },
    user !== ''
      ? {
          exclusive: true,
          text: 'Dashboard',
          path: '/dashboard',
          icon: <DashboardIcon />,
        }
      : false,
  ];

  /* Declare routes as protected */
  const PersInfoForm = WithAuth(PersonalInformationForm);
  const PersMatchHist = WithAuth(PersonalMatchHistory);
  const CalndPicker = WithAuth(UnavailabilityPeriods);
  const ApprvDrafts = WithAuth(ApproveDrafts);
  const Dlgt = WithAuth(Delegate);

  const { user, finished } = props;

  useEffect(() => {
    if (finished) {
      navigate('/dashboard');
    }
  }, [finished]);

  return (
    <div className="app">
      {/* To filter out "false" elements */}
      <ResponsiveDrawer links={links.filter((elem) => elem)}>
        <Router>
          <Home path="/" />
          <Matches path="/matches" />
          {user === '' && <Login path="/login" />}
          {user !== '' && <Dashboard path="/dashboard" />}
          {<Dashboard path="/dashboard" />}
          <PersonalInformationForm path="/updateinfo" />
          <PersonalMatchHistory path="/viewhistory" />
          <UnavailabilityPeriods path="/addunavailable" />
          <ApproveDrafts path="/approvedrafts" />
          <Delegate path="/delegate" />
          <Team path="/team" />
        </Router>
      </ResponsiveDrawer>
    </div>
  );
};

export default connect(mapStateToProps)(App);
