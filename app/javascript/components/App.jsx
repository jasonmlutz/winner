import React, { useEffect, useContext } from "react";
import { useRoutes } from "react-router-dom";

import { CurrentUserContext } from "./contexts/CurrentUserContext";

import Home from "./Home";
import NewSurveyForm from "./Surveys/NewSurveyForm";
import SurveyDisplay from "./Surveys/SurveyDisplay";

import UsersContainer from "./Users/UsersContainer";
import UserDisplay from "./Users/UserDisplay";

import NotFound from "./NotFound";

const App = () => {
  const { currentUser, setCurrentUser, sessionToken } =
    useContext(CurrentUserContext);

  useEffect(() => {
    async function fetchCurrentUser() {
      const token = document.querySelector("[name=csrf-token]").content;
      const response = await fetch(`/api/surveys/${id}`, {
        method: "GET",
        headers: {
          "X-CSRF-TOKEN": token,
          "Content-Type": "application/json",
        },
        body: {
          session_token: sessionToken,
        },
      }).catch((error) => {
        window.alert(error);
        return;
      });

      if (!response.ok) {
        const message = `An error has occurred fetching current user: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user) {
        window.alert(`no user found with session token ${sessionToken}`);
      }

      setCurrentUser(user);
    }

    if (sessionToken && !currentUser) {
      fetchCurrentUser();
    }
    return;
  }, [currentUser, sessionToken]);

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "users/",
      children: [
        { path: "", element: <UsersContainer /> },
        { path: ":id/", element: <UserDisplay /> },
      ],
    },
    {
      path: "surveys/",
      children: [
        { path: "", element: <Home /> },
        { path: "new", element: <NewSurveyForm /> },
        {
          path: ":id/",
          children: [
            { path: "", element: <SurveyDisplay /> },
            { path: ":timestamp", element: <SurveyDisplay /> },
          ],
        },
      ],
    },
  ]);

  routes = routes || <NotFound pathname={location.pathname} />;

  return <div className="App">{routes}</div>;
};

export default App;
