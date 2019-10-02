import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router";

import Register from "../layout/Register";
import Login from "../layout/Login";

import "./Landing.css";

const Landing = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="Landing">
      <div className="Landing--main">
        Store all your contacts in one Place
        <div className="Landing--btns">
          <Register />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Landing;
