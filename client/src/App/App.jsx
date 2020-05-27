import React from 'react';
import { Router } from '@reach/router';
import ResponsiveNavigation from '../components/ResponsiveNavigation';
import logo from '../assets/frv_logo_no_bg.png';
import Home from '../containers/Home';
import Matches from '../containers/Matches';
import LoginStub from '../containers/LoginStub';


const App = () => {
  const navLinks = [
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

  return (
    <div className="app">
      <ResponsiveNavigation
        navLinks={navLinks}
        background="#000000"
        hoverBackground="#ddd"
        linkColor="#777"
        logo={logo}
      />
      <Router>
        <Home path="/" />
        <Matches path="/matches" />
        <LoginStub path="/login" />
      </Router>
    </div>
  );
};

export default App;
