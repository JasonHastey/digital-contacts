import React, { useState, Fragment } from "react";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/alert/AlertState";

import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";

import setAuthToken from "./utils/setAuthToken";

import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Landing from "./components/pages/Landing";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Header />
              <div className="App">
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/about" component={About} />
                  <PrivateRoute exact path="/home" component={Home} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
