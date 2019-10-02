import React, { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

// import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PropTypes from "prop-types";

import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    setCurrent,
    clearCurrent,
    current,
    updateContact
  } = contactContext;
  const { _id, name, email, phone, address, type, notes, date } = contact;
  const newDate = date.slice(0, 10);
  const time = date.slice(14, 22);
  const [isCurrentContact, setIsCurrentContact] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "personal",
    notes: ""
  });

  useEffect(() => {
    if (current !== null) {
      setContactForm(current);

      if (contact.id === current.id) {
        console.log(`${current.id}`);
        setIsCurrentContact(true);
      }
    } else {
      setIsCurrentContact(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        type: "personal",
        notes: ""
      });
    }
  }, [contactContext, current]);

  const handleDelete = e => {
    deleteContact(_id);
    clearCurrent();
  };

  const onChange = e => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const onUpdate = async () => {
    await updateContact(contactForm);
    await clearCurrent();
  };

  return (
    <Card className="mx-auto mt-5" border="dark" style={{ width: "30rem" }}>
      <Card.Header style={{ backgroundColor: "#2c2c2c", color: "white" }}>
        <Card.Title className=" float-left">{name.toUpperCase()}</Card.Title>
        <Badge
          className="py-3 px-5 float-right"
          variant={type === "personal" ? "primary" : "success"}
        >
          {type.toUpperCase()}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onUpdate}>
          <Form.Group as={Row} controlId="formName">
            <Form.Label column sm="4">
              Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="name"
                onChange={onChange}
                type="text"
                required
                defaultValue={name}
                plaintext={isCurrentContact ? false : true}
                readOnly={isCurrentContact ? false : true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm="4">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="email"
                onChange={onChange}
                type="email"
                plaintext
                readOnly
                defaultValue={email}
                plaintext={isCurrentContact ? false : true}
                readOnly={isCurrentContact ? false : true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPhone">
            <Form.Label column sm="4">
              Phone
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="phone"
                onChange={onChange}
                type="text"
                plaintext
                readOnly
                defaultValue={phone}
                plaintext={isCurrentContact ? false : true}
                readOnly={isCurrentContact ? false : true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAddress">
            <Form.Label column sm="4">
              Address
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="address"
                onChange={onChange}
                type="text"
                plaintext
                readOnly
                defaultValue={address}
                plaintext={isCurrentContact ? false : true}
                readOnly={isCurrentContact ? false : true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formNotes">
            <Form.Label column sm="4">
              Notes
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="notes"
                onChange={onChange}
                as="textarea"
                rows="3"
                readOnly
                defaultValue={notes}
                plaintext={isCurrentContact ? false : true}
                readOnly={isCurrentContact ? false : true}
              />
            </Col>
          </Form.Group>
          {isCurrentContact && (
            <Form.Group contro lId="exampleForm.ControlSelect1">
              <Form.Label>Type</Form.Label>
              <Form.Control name="type" onChange={onChange} as="select">
                <option>Personal</option>
                <option>Professional</option>
              </Form.Control>
            </Form.Group>
          )}
        </Form>
        {isCurrentContact ? (
          <Button
            className="my-1"
            block
            variant={type === "personal" ? "primary" : "success"}
            onClick={onUpdate}
          >
            Update Contact
          </Button>
        ) : (
          <Button
            className="my-1"
            block
            variant={type === "personal" ? "primary" : "success"}
            onClick={() => setCurrent(contact)}
          >
            Edit Contact
          </Button>
        )}

        <Button className="my-1" block variant="danger" onClick={handleDelete}>
          Delete Contact
        </Button>
      </Card.Body>
      <Card.Footer
        style={{
          backgroundColor: "#2c2c2c",
          color: "white",
          fontSize: "medium"
        }}
      >
        <small className="text-muted">{`Created ${newDate}`}</small>
      </Card.Footer>
    </Card>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};
export default ContactItem;
