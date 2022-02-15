import React from "react";
import { useParams } from "react-router-dom";

const LiveSurveyDisplay = () => {
  const params = useParams();
  const id = params.id.toString();
  return <div>LiveSurveyDisplay, {id}</div>;
};

export default LiveSurveyDisplay;
