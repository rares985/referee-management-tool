import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendar,
  faSignInAlt,
  faUser,
  faListAlt,
  faCogs,
  faHistory,
  faCalendarTimes,
  faUsers,
  faPlusSquare,
  faCheckSquare,
  faSpinner,
  faListUl,
} from '@fortawesome/free-solid-svg-icons';

import ResponsiveDrawer from '../components/ResponsiveDrawer';

/* Public pages */
import Home from '../pages/Home';
import PublicMatches from '../pages/PublicMatches';
import Login from '../pages/Login';

/* Basic user pages */
import Account from '../pages/Account';
import PersonalInformation from '../pages/PersonalInformation';
import Settings from '../pages/Settings';
import PersonalMatchHistory from '../pages/PersonalMatchHistory';
import Unavailable from '../pages/Unavailable';

/* Delegator pages */
import Delegate from '../pages/Delegate';
import ProposedRejected from '../pages/ProposedRejected';

/* Approver pages */
import ApproveDrafts from '../pages/ApproveDrafts';

/* Team pages */
import Team from '../pages/Team';
import TeamList from '../pages/TeamList';
import TeamUnavailabilities from '../pages/TeamUnavailabilities';
import TeamHistory from '../pages/TeamHistory';

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const getLinks = (rights) => {
  const { basic, delegation, approval, team } = rights;

  const publicLinks = [
    {
      text: 'Acasă',
      path: '/',
      icon: <FontAwesomeIcon size="lg" icon={faHome} />,
    },
    {
      text: 'Meciuri',
      path: '/matches',
      icon: <FontAwesomeIcon size="lg" icon={faCalendar} />,
    },
    {
      text: 'Autentificare',
      path: '/login',
      icon: <FontAwesomeIcon size="lg" icon={faSignInAlt} />,
    },
  ];

  const basicLinks = [
    {
      text: 'Contul Meu',
      path: '/account',
      icon: <FontAwesomeIcon size="lg" icon={faUser} />,
      nested: [
        {
          text: 'Date personale',
          path: '/info',
          icon: <FontAwesomeIcon size="lg" icon={faListAlt} />,
        },
        {
          text: 'Setări cont',
          path: '/settings',
          icon: <FontAwesomeIcon size="lg" icon={faCogs} />,
        },
      ],
    },
    {
      text: 'Istoric meciuri',
      path: '/history',
      icon: <FontAwesomeIcon size="lg" icon={faHistory} />,
    },
    {
      text: 'Indisponibilități',
      path: '/unavailable',
      icon: <FontAwesomeIcon size="lg" icon={faCalendarTimes} />,
    },
  ];

  const delegationLinks = [
    {
      text: 'Delegă arbitri',
      path: '/delegate',
      icon: <FontAwesomeIcon size="lg" icon={faPlusSquare} />,
    },
    {
      text: 'Verifică propuneri',
      path: '/proposals',
      icon: <FontAwesomeIcon size="lg" icon={faSpinner} />,
    },
  ];

  const approvalLinks = [
    {
      text: 'Aprobă propuneri',
      path: '/approve',
      icon: <FontAwesomeIcon size="lg" icon={faCheckSquare} />,
    },
  ];

  const teamLinks = [
    {
      text: 'Echipa mea',
      path: '/team',
      icon: <FontAwesomeIcon size="lg" icon={faUsers} />,
      nested: [
        {
          text: 'Listă',
          path: '/team/list',
          icon: <FontAwesomeIcon size="lg" icon={faListUl} />,
        },
        {
          text: 'Indisponibilități',
          path: '/team/unavailable',
          icon: <FontAwesomeIcon size="lg" icon={faCalendarTimes} />,
        },
        {
          text: 'Istoric meciuri',
          path: '/team/history',
          icon: <FontAwesomeIcon size="lg" icon={faHistory} />,
        },
      ],
    },
  ];

  return [
    ...publicLinks,
    ...(basic ? basicLinks : []),
    ...(delegation ? delegationLinks : []),
    ...(approval ? approvalLinks : []),
    ...(team ? teamLinks : []),
  ];
};

const App = (props) => {
  /* eslint-disable no-unused-vars */
  const { user } = props;
  /* eslint-enable no-unused-vars */

  const links = getLinks({ basic: true, delegation: true, approval: true, team: true });

  return (
    <div className="app">
      <ResponsiveDrawer links={links}>
        <Router>
          {/* public links */}
          <Home path="/" />
          <PublicMatches path="/matches" />
          <Login path="/login" />

          {/* basic links */}
          <Account path="/account" />
          <PersonalInformation path="/info" />
          <Settings path="/settings" />
          <PersonalMatchHistory path="/history" />
          <Unavailable path="/unavailable" />

          {/* delegator links */}
          <Delegate path="/delegate" />

          {/* approver links */}
          <ProposedRejected path="/proposed" />
          <ApproveDrafts path="/approve" />

          {/* team links */}
          <Team path="/team" />
          <TeamList path="/team/list" />
          <TeamUnavailabilities path="/team/unavailable" />
          <TeamHistory path="/team/history" />
        </Router>
      </ResponsiveDrawer>
    </div>
  );
};

App.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);
