import React, { useState } from "react";

import { NewUserForm } from "./Users/NewUserForm";
import NewSessionForm from "./Sessions/NewSessionForm";

const Auth = ({
  initialState = "login",
  source = "/profile",
  message = null,
}) => {
  const [type, setType] = useState(initialState);
  switch (type) {
    case "register":
      return (
        <NewUserForm source={source} setType={setType} message={message} />
      );
    case "login":
      return (
        <NewSessionForm source={source} setType={setType} message={message} />
      );
    default:
      return null;
  }
};

export default Auth;
