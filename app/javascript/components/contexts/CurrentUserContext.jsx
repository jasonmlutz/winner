import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionToken, setSessionToken] = useState(
    sessionStorage.getItem("sessionToken")
  );
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        sessionToken,
        setSessionToken,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
