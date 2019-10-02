import React from "react";

import "./About.css";

const About = () => {
  return (
    <div className="About">
      <div className="About__container">
        <span className="About__header">About</span>
        <p className="About__info">
          Digital Contacts is a place where you can securely store personal and
          professional contacts. Digital Contacts is built with ReactJS on the
          front end and NodeJS on the backend. Contacts are stored with MongoDB
          with the help of mongoose.
        </p>
      </div>
    </div>
  );
};

export default About;
