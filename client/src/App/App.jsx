import React, { useState } from 'react';
import { Router, navigate } from '@reach/router';
import ResponsiveNavigation from '../components/ResponsiveNavigation';
import logo from '../assets/frv_logo_no_bg.png';
import Home from '../containers/Home';
import Matches from '../containers/Matches';
import LoginStub from '../containers/LoginStub';
import Dashboard from '../containers/Dashboard';
import PersonalInformationForm from '../containers/PersonalInformationForm';
import PersonalMatchHistory from '../containers/PersonalMatchHistory';
import CalendarPicker from '../containers/CalendarPicker';
import WithAuth from '../components/withAuth';
/* eslint-disable */

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState('');

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
    // // Remove in PROD
    // {
    //   text: 'Dashboard',
    //   path: '/account',
    //   icon: 'ion-ios-person',
    // },
  ];

  const userLinks = [
    ...guestLinks.slice(0, guestLinks.length - 1),
    {
      text: 'Dashboard',
      path: '/account',
      icon: 'ion-ios-person',
    },
  ];

  const PersInfoForm = WithAuth(PersonalInformationForm);

  return (
    <div className="app">
      <ResponsiveNavigation
        navLinks={loggedIn ? userLinks : guestLinks}
        background="#000000"
        hoverBackground="#ddd"
        linkColor="#777"
        logo={logo}
      />
      <Router>
        <Home path="/" />
        <Matches path="/matches" />
        {!loggedIn && <LoginStub path="/login" navigate={navigate} userCallback={setAuthenticatedUser} loginCallback={setLoggedIn} />}
        {loggedIn && <Dashboard path="/account" logoutCallback={setLoggedIn} userCallback={setAuthenticatedUser} navigate={navigate} />}
        <PersInfoForm path="/updateinfo" authenticatedUser={authenticatedUser} navigate={navigate}/>
        <PersonalMatchHistory path="/viewhistory" authenticatedUser={authenticatedUser}/>
        <CalendarPicker path="/addunavailable" />
        {/* <Dashboard path="/account" logoutCallback={setLoggedIn} navigate={navigate} /> */}
      </Router>
    </div>
  );
};

export default App;
