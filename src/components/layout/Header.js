import React, { Fragment, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AuthContext from "../../context/auth/authContext";

import Register from "./Register";
import Login from "./Login";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { user, logout, isAuthenticated } = authContext;

  const signedOut = (
    <Fragment>
      <Register />
      <Login />
    </Fragment>
  );

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">
        Digital Contacts
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/about">
          About
        </Nav.Link>
      </Nav>
      {isAuthenticated ? (
        <Button variant="outline-primary" onClick={logout}>
          Logout
        </Button>
      ) : (
        <ButtonToolbar className="ml-auto">{signedOut}</ButtonToolbar>
      )}
    </Navbar>
  );
};

export default Header;
