import React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./Home";
import NewSurveyForm from "./Surveys/NewSurveyForm";
import SurveyDisplay from "./Surveys/SurveyDisplay";

import UsersContainer from "./Users/UsersContainer";

import NotFound from "./NotFound";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "users/", element: <UsersContainer /> },
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
