import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import Login from '../containers/Login';

import logo from '../assets/frv_logo_no_bg.png'

function GenericNotFound() {
  return <h1> Page not Found!</h1>
}


const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="FRV-logo"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/news">News</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>

      <Switch>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/login">
          <Login onSubmit={() => { }} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/404" component={GenericNotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}


function Home() {
  return <h4>Home</h4>;
}

function News() {
  return <h4>News</h4>;
}

export default App;
