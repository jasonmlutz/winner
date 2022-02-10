import React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./Home";
import NewSurveyForm from "./Surveys/NewSurveyForm";
import SurveyDisplay from "./Surveys/SurveyDisplay";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/surveys/new", element: <NewSurveyForm /> },
    { path: "/surveys/:id", element: <SurveyDisplay /> },
  ]);

  return <div className="App">{routes}</div>;
};

export default App;
