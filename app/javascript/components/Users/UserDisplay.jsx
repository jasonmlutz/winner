import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Header";

const UserDisplay = () => {
  const [authoredSurveys, setAuthoredSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [hovered, setHovered] = useState("");
  const [user, setUser] = useState({ name: "" });
  const navigate = useNavigate();

  const params = useParams();
  const id = params.user_id.toString();

  async function fetchData(url, callback) {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const data = await response.json();
    if (!data) {
      window.alert(`Objects not found at ${url}!`);
      return;
    }

    callback(data);
  }

  useEffect(() => {
    fetchData(`/api/users/${id}`, setUser);
    fetchData(`/api/users/${id}/surveys`, setAuthoredSurveys);
    fetchData(`/api/users/${id}/responses`, setResponses);
  }, [params.user_id, navigate]);

  const renderSurveysAuthored = () => {
    if (authoredSurveys.length) {
      return (
        <>
          <div className="heading">Surveys Authored:</div>
          <div className="text__title text__title--medium">Live Surveys:</div>
          <ul>
            {authoredSurveys.map((survey) => {
              if (survey.publish) {
                return (
                  <li
                    key={survey.id}
                    className={
                      hovered === survey.id
                        ? "text__icon darken-background"
                        : "text__icon"
                    }
                    onMouseEnter={(e) => {
                      setHovered(survey.id);
                    }}
                    onMouseLeave={(e) => {
                      setHovered("");
                    }}
                    onClick={() => navigate(`/surveys/live/${survey.id}`)}
                  >
                    {survey.title}
                  </li>
                );
              }
            })}
          </ul>
          <div className="text__title text__title--medium">
            Unpublished Surveys:
          </div>
          <ul>
            {authoredSurveys.map((survey) => {
              if (!survey.publish) {
                return (
                  <li
                    key={survey.id}
                    className={
                      hovered === survey.id
                        ? "text__icon darken-background"
                        : "text__icon"
                    }
                    onMouseEnter={(e) => {
                      setHovered(survey.id);
                    }}
                    onMouseLeave={(e) => {
                      setHovered("");
                    }}
                    onClick={() => navigate(`/surveys/edit/${survey.id}`)}
                  >
                    {survey.title}
                  </li>
                );
              }
            })}
          </ul>
        </>
      );
    } else {
      return <div className="heading">No Surveys Authored!</div>;
    }
  };

  const renderResponses = () => {
    if (responses.length) {
      return (
        <>
          <div className="heading">Responses Authored:</div>
          <ul>
            {responses.map((response) => {
              return (
                <li
                  key={response.id}
                  className={
                    hovered === response.id
                      ? "text__icon darken-background"
                      : "text__icon"
                  }
                  onMouseEnter={(e) => {
                    setHovered(response.id);
                  }}
                  onMouseLeave={(e) => {
                    setHovered("");
                  }}
                  onClick={() => navigate(`/responses/${response.id}`)}
                >
                  {response.survey_title}
                </li>
              );
            })}
          </ul>
        </>
      );
    } else {
      return <div className="heading">No Responses Authored!</div>;
    }
  };

  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
        className="absolute h-full w-full object-cover"
      />
      <Header className="absolute z-20" />
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="heading">All About {user.name}</div>
        {renderSurveysAuthored()}
        {renderResponses()}
      </div>
      <div className="inset-0 bg-black opacity-75 absolute"></div>
    </div>
  );
};

export default UserDisplay;
