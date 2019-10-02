import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import { useHistory } from "react-router";

const Register = () => {
  let history = useHistory();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const [Show, setShow] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
      setShow(false);
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    console.log(e);
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      console.error("Passwords do not match");
    } else {
      register({ name, email, password });
      //loadUser();
    }
  };

  return (
    <div className="Register">
      <Modal
        size="lg"
        show={Show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="registerFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                onChange={onChange}
                type="text"
                placeholder="Name"
                required
              />
            </Form.Group>

            <Form.Group controlId="registerFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={onChange}
                type="email"
                placeholder="Email"
                required
              />
            </Form.Group>

            <Form.Group controlId="registerFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={onChange}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Group controlId="registerFormPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="password2"
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </Form.Group>

            <Form.Group controlId="registerFormSubmit">
              <Button type="submit" block onSubmit={onSubmit}>
                Sign Up
              </Button>
            </Form.Group>
            <Form.Group controlId="registerFormSubmit">
              <Button
                variant="secondary"
                type="submit"
                block
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Button className="mr-2" onClick={() => setShow(true)}>
        Register
      </Button>
    </div>
  );
};

export default Register;
