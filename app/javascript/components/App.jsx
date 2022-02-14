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
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("currentUserToken");
    async function fetchCurrentUser() {
      const response = await fetch(
        `/api/session?session_token=${sessionToken}`
      );

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
  });

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
