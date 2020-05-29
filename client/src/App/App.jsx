import React, { useState } from 'react';
import { Router, navigate } from '@reach/router';
import ResponsiveNavigation from '../components/ResponsiveNavigation';
import logo from '../assets/frv_logo_no_bg.png';
import Home from '../containers/Home';
import Matches from '../containers/Matches';
import LoginStub from '../containers/LoginStub';

/* eslint-disable */
const Dashboard = () => {
  return (
    <div className="page-container">
      <p> Dashboard </p>
    </div>
  );
};

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
  ];

  const userLinks = [
    ...guestLinks.slice(0, guestLinks.length - 1),
    {
      text: 'Personal Account',
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
        {loggedIn && <Dashboard path="/account" />}
      </Router>
    </div>
  );
};

export default App;
