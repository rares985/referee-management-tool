import React, { useState } from 'react';
import { Router, navigate } from '@reach/router';
import ResponsiveNavigation from '../components/ResponsiveNavigation';
import logo from '../assets/frv_logo_no_bg.png';
import Home from '../pages/Home';
import Matches from '../pages/Matches';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import PersonalInformationForm from '../pages/PersonalInformationForm';
import PersonalMatchHistory from '../pages/PersonalMatchHistory';
import CalendarPicker from '../pages/CalendarPicker';
import ProposeDrafts from '../pages/ProposeDrafts';
import ApproveDrafts from '../pages/ApproveDrafts';
import WithAuth from '../components/withAuth';
/* eslint-disable */

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState('');
  const [userId, setUserId] = useState(-1);
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
  const CalndPicker = WithAuth(CalendarPicker);
  const ApprvDrafts = WithAuth(ApproveDrafts);
  const PrpsDrafts = WithAuth(ProposeDrafts);

  return (
    <div className="app">
      <ResponsiveNavigation
        navLinks={loggedIn ? userLinks : guestLinks}
        background="#000000"
        hoverBackground="#ddd"
        linkColor="#777"
        logo={logo}
      />
      <h4>Logat ca {authenticatedUser}</h4>
      <Router>
        <Home path="/" />
        <Matches path="/matches" />
        {!loggedIn && <Login path="/login" navigate={navigate} userCallback={setAuthenticatedUser} loginCallback={setLoggedIn} />}
        {loggedIn && <Dashboard path="/account" logoutCallback={setLoggedIn} useridCB={setUserId} navigate={navigate} />}
        {/* <PersInfoForm path="/updateinfo" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <PersonalInformationForm path="/updateinfo" navigate={navigate} />
        {/* <PersMatchHist path="/viewhistory" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <PersonalMatchHistory path="/viewhistory" authenticatedUser={authenticatedUser} navigate={navigate} />
        {/* <CalndPicker path="/addunavailable" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <CalendarPicker path="/addunavailable" authenticatedUser={authenticatedUser} navigate={navigate} />
        {/* <ApprvDrafts path="/approvedrafts" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <ApproveDrafts path="/approvedrafts" authenticatedUser={authenticatedUser} userid={userId} navigate={navigate} />
        {/* <PrpsDrafts path="/proposedrafts" authenticatedUser={authenticatedUser} navigate={navigate} /> */}
        <ProposeDrafts path="/proposedrafts" authenticatedUser={authenticatedUser} userid={userId} navigate={navigate} />
      </Router>
    </div>
  );
};

export default App;
