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
/* eslint-disable */

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
    {
      text: 'Dashboard',
      path: '/account',
      icon: 'ion-ios-person',
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
        {!loggedIn && <LoginStub path="/login" navigate={navigate} loginCallback={setLoggedIn} />}
        {loggedIn && <Dashboard path="/account" logoutCallback={setLoggedIn} navigate={navigate} />}
        <PersonalInformationForm path="/updateinfo" />
        <PersonalMatchHistory path="/viewhistory" />
        <CalendarPicker path="/addunavailable" />
        <Dashboard path="/account" logoutCallback={setLoggedIn} navigate={navigate} />
      </Router>
    </div>
  );
};

export default App;
