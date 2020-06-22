import React, { useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { connect } from 'react-redux';
import ResponsiveNavigation from '../components/ResponsiveNavigation';
import logo from '../assets/frv_logo_no_bg.png';
import Home from '../pages/Home';
import Matches from '../pages/Matches';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import PersonalInformationForm from '../pages/PersonalInformationForm';
import PersonalMatchHistory from '../pages/PersonalMatchHistory';
import UnavailabilityPeriods from '../pages/UnavailabilityPeriods';
import Delegate from '../pages/Delegate';
import ApproveDrafts from '../pages/ApproveDrafts';
import WithAuth from '../components/withAuth';
/* eslint-disable */

const mapStateToProps = (state) => ({
  user: state.login.user,
  finished: state.login.finished,
});


const App = (props) => {
  const guestLinks = [
    {
      text: 'Home',
      path: '/',
      icon: 'ion-ios-home',
    },
    {
      text: 'Matches',
      path: '/matches',
      icon: 'ion-ios-home',
    },
    {
      text: 'Login',
      path: '/login',
      icon: 'ion-ios-lock',
    },
  ];

  const userLinks = [
    ...guestLinks.slice(0, guestLinks.length - 1),
    {
      text: 'Dashboard',
      path: '/account',
      icon: 'ion-ios-person',
    },
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
      navigate("/account");
    }
  }, [finished]);

  return (
    <div className="app">
      <ResponsiveNavigation
        navLinks={(user !== '') ? userLinks : guestLinks}
        background="#000000"
        hoverBackground="#ddd"
        linkColor="#777"
        logo={logo}
      />
      <h4>Logat ca {user}</h4>
      <Router>
        <Home path="/" />
        <Matches path="/matches" />
        {(user === '') && <Login path="/login" navigate={navigate} />}
        {(user !== '') && <Dashboard path="/account" navigate={navigate} />}
        {/* <PersInfoForm path="/updateinfo" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <PersonalInformationForm path="/updateinfo" navigate={navigate} />
        {/* <PersMatchHist path="/viewhistory" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <PersonalMatchHistory path="/viewhistory" authenticatedUser={user} navigate={navigate} />
        {/* <CalndPicker path="/addunavailable" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <UnavailabilityPeriods path="/addunavailable" navigate={navigate} />
        {/* <ApprvDrafts path="/approvedrafts" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <ApproveDrafts path="/approvedrafts" navigate={navigate} />
        {/* <PrpsDrafts path="/delegate" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <Delegate path="/delegate" navigate={navigate} />
      </Router>
    </div>
  );
};

export default connect(mapStateToProps)(App);
