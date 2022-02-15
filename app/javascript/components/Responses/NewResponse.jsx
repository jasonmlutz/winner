import React from "react";
import { useParams } from "react-router-dom";

const NewResponse = () => {
  const params = useParams();
  const id = params.id.toString();
  return <div>LiveSurveyDisplay, {id}</div>;
};

export default NewResponse;
