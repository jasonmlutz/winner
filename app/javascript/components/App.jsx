import React, { useEffect, useContext } from "react";
import { useRoutes } from "react-router-dom";

import { CurrentUserContext } from "./contexts/CurrentUserContext";

import Landing from "./Landing";
import Auth from "./Auth";

import Profile from "./Users/Profile";
import UserDisplay from "./Users/UserDisplay";
import UsersContainer from "./Users/UsersContainer";

import SurveysContainer from "./Surveys/SurveysContainer";
import NewSurveyForm from "./Surveys/NewSurveyForm";
import SurveyDisplay from "./Surveys/SurveyDisplay";

import NewResponse from "./Responses/NewResponse";
import ResponseDisplay from "./Responses/ResponseDisplay";
import ResponsesContainer from "./Responses/ResponsesContainer";

import NotFound from "./NotFound";

const App = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    async function fetchCurrentUser() {
      const response = await fetch(`/api/session`);

      if (!response.ok) {
        const message = `An error has occurred fetching current user: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user.id) {
        return;
      }

      setCurrentUser(user);
    }

    if (!currentUser.id) {
      fetchCurrentUser();
    }
    return;
  }, [currentUser]);

  let routes;

  if (currentUser.id) {
    // there is a valid current user
    routes = useRoutes([
      { path: "/", element: <Profile /> },
      { path: "register/", element: <Profile /> },
      { path: "login/", element: <Profile /> },
      { path: "profile/", element: <Profile /> },
      {
        path: "users/",
        children: [
          { path: "", element: <UsersContainer /> },
          { path: ":user_id/", element: <UserDisplay /> },
        ],
      },
      {
        path: "surveys/",
        children: [
          { path: "", element: <SurveysContainer /> },
          { path: "new", element: <NewSurveyForm /> },
          { path: ":survey_id", element: <NewResponse /> },
          { path: ":survey_id/responses", element: <ResponsesContainer /> },
          {
            path: "edit/:id/",
            children: [
              { path: "", element: <SurveyDisplay /> },
              { path: ":timestamp", element: <SurveyDisplay /> },
            ],
          },
        ],
      },
      { path: "responses/:response_id", element: <ResponseDisplay /> },
      { path: "*", element: <NotFound pathname={location.pathname} /> },
    ]);
  } else {
    // there is no current user
    routes = useRoutes([
      { path: "/", element: <Landing /> },
      { path: "register/", element: <Auth initialState="register" /> },
      { path: "login/", element: <Auth /> },
      { path: "auth/", element: <Auth /> },
      {
        path: "profile/",
        element: (
          <Auth
            source={location.pathname}
            message="Account required to access this resource."
          />
        ),
      },
      {
        path: "users/",
        children: [
          { path: "", element: <UsersContainer /> },
          { path: ":user_id/", element: <UserDisplay /> },
        ],
      },
      {
        path: "surveys/",
        children: [
          { path: "", element: <SurveysContainer /> },
          {
            path: "new",
            element: (
              <Auth
                source={location.pathname}
                message="Account required to access this resource."
              />
            ),
          },
          {
            path: ":survey_id",
            element: (
              <Auth
                source={location.pathname}
                message="Account required to access this resource."
              />
            ),
          },
          {
            path: ":survey_id/responses",
            element: (
              <Auth
                source={location.pathname}
                message="Account required to access this resource."
              />
            ),
          },
          {
            path: "edit/:id/",
            children: [
              {
                path: "",
                element: (
                  <Auth
                    source={location.pathname}
                    message="Account required to access this resource."
                  />
                ),
              },
              {
                path: ":timestamp",
                element: (
                  <Auth
                    source={location.pathname}
                    message="Account required to access this resource."
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        path: "responses/:response_id",
        element: (
          <Auth
            source={location.pathname}
            message="Account required to access this resource."
          />
        ),
      },
      { path: "*", element: <NotFound pathname={location.pathname} /> },
    ]);
  }

  return <div className="App">{routes}</div>;
};

export default App;
