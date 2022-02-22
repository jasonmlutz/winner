import React from "react";
import { useNavigate } from "react-router-dom";

import SurveysContainer from "./Surveys/SurveysContainer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div className="text__title text__title--large text__title--wide">
        <div className="heading">Survey App</div>
      </div>
      <SurveysContainer />
      <div className="text__title text__title--large text__title--wide">
        <div className="heading">Create a survey!</div>
        <button
          className="input__submit input__submit--large"
          type="submit"
          onClick={() => {
            navigate("/surveys/new");
          }}
        >
          Go
        </button>
      </div>
      <div className="text__title text__title--large text__title--wide">
        <div className="heading">Register!</div>
        <button
          className="input__submit input__submit--large"
          type="submit"
          onClick={() => {
            navigate("/users");
          }}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Home;
