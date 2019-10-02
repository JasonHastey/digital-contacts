import React, { useContext, useRef, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";

import Navbar from "react-bootstrap/Navbar";

import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Home = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { filterContacts, clearFilter } = contactContext;
  const { loadUser } = authContext;

  const filtered = useRef("");
  const handleFilter = e => {
    if (filtered !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    console.log("object");
  };
  return (
    <div>
      <Navbar bg="light" variant="dark" className="px-5 py-4" sticky="top">
        <ContactForm />
        <input
          name="filter"
          className="ml-auto p-2"
          placeholder="Search Contacts"
          ref={filtered}
          onChange={handleFilter}
          onSubmit={handleSubmit}
        />
      </Navbar>
      <div className="Contacts">
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
