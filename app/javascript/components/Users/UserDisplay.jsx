import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserDisplay = () => {
  const [authoredSurveys, setAuthoredSurveys] = useState([]);
  const [hovered, setHovered] = useState("");
  const [user, setUser] = useState({ name: "" });
  const navigate = useNavigate();

  const params = useParams();
  const id = params.user_id.toString();

  useEffect(() => {
    async function fetchAuthoredSurveys() {
      const response = await fetch(`/api/users/${id}/surveys`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`this user has authored no surveys`);
        return;
      }

      setAuthoredSurveys(data);
    }

    async function fetchUser() {
      const response = await fetch(`/api/users/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`this user has authored no surveys`);
        return;
      }

      setUser(data);
    }

    fetchAuthoredSurveys();
    fetchUser();
    return;
  }, [params.user_id, navigate]);

  const renderSurveysAuthored = () => {
    if (authoredSurveys.length) {
      return (
        <>
          <div className="heading">Surveys Authored:</div>
          <ul>
            {authoredSurveys.map((survey) => (
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
                onClick={() => navigate(`/surveys/${survey.id}`)}
              >
                {survey.title}
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return <div className="heading">No Surveys Authored!</div>;
    }
  };

  return (
    <div className="UserDisplay">
      <div className="heading">All About {user.name}</div>
      {renderSurveysAuthored()}
    </div>
  );
};

export default UserDisplay;
