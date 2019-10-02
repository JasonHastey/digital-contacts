import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ContactContext from "../../context/contact/contactContext";
import { useEffect } from "react";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current } = contactContext;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "personal",
    notes: ""
  });

  const { name, email, phone, address, type, notes } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addContact(contact);
    setContact({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "personal",
      notes: ""
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Contact
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Contact</Modal.Title>
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
              />
            </Form.Group>

            <Form.Group controlId="registerFormPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                onChange={onChange}
                type="text"
                placeholder="Phone"
              />
            </Form.Group>

            <Form.Group controlId="registerFormAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                onChange={onChange}
                type="text"
                placeholder="Address"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Type</Form.Label>
              <Form.Control name="type" onChange={onChange} as="select">
                <option>Personal</option>
                <option>Professional</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                name="notes"
                onChange={onChange}
                as="textarea"
                rows="3"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactForm;
