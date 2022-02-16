import React from "react";
import { useParams } from "react-router-dom";

const ResponseDisplay = () => {
  const params = useParams();
  const response_id = params.response_id.toString();

  return <div>ResponseDisplay, id {response_id} </div>;
};

export default ResponseDisplay;
