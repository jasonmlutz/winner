import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  async function handleLogout() {
    const token = document.querySelector("[name=csrf-token]").content;
    const sessionToken = sessionStorage.getItem("sessionToken");

    await fetch(`api/session`, {
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_token: sessionToken,
      }),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    sessionStorage.setItem("sessionToken", "");
    setCurrentUser(null);
    navigate("/");
    alert("logout successful");
  }

  return (
    <div className="Logout">
      {currentUser ? (
        <>
          LOGOUT
          <button
            className="input__submit input__submit--large"
            onClick={handleLogout}
          >
            GO
          </button>
        </>
      ) : (
        <>no user to logout!</>
      )}
    </div>
  );
};

export default Logout;
