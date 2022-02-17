import React, { useEffect, useContext } from "react";
import { useRoutes } from "react-router-dom";

import { CurrentUserContext } from "./contexts/CurrentUserContext";

import Landing from "./Landing";
import NewSessionForm from "./Sessions/NewSessionForm";
import NewUserForm from "./Users/NewUserForm";
import Header from "./Header";

import UserDisplay from "./Users/UserDisplay";

import NotFound from "./NotFound";

const App = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("sessionToken");
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
  }, [currentUser]);

  let routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "register/", element: <NewUserForm /> },
    { path: "login/", element: <NewSessionForm /> },
    { path: "app/", element: <Header /> },
    { path: "/users/:user_id/", element: <UserDisplay /> },
    // { path: "logout/", element: <Logout /> },
    // {
    //   path: "users/",
    //   children: [
    //     { path: "", element: <UsersContainer /> },
    //     { path: ":user_id/", element: <UserDisplay /> },
    //   ],
    // },
    // { path: "responses/:response_id", element: <ResponseDisplay /> },
    // {
    //   path: "surveys/",
    //   children: [
    //     { path: "", element: <Home /> },
    //     { path: "new", element: <NewSurveyForm /> },
    //     { path: "live/:survey_id", element: <NewResponse /> },
    //     {
    //       path: "edit/:id/",
    //       children: [
    //         { path: "", element: <SurveyDisplay /> },
    //         { path: ":timestamp", element: <SurveyDisplay /> },
    //       ],
    //     },
    //   ],
    // },
  ]);

  routes = routes || <NotFound pathname={location.pathname} />;

  return <div className="App">{routes}</div>;
};

export default App;
