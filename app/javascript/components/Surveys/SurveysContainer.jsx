import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SurveysContainer = () => {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/surveys/`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`No surveys found!`);
        return;
      }

      setSurveys(data);
    }

    fetchData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const renderSurveys = () => {
    if (surveys.length) {
      return (
        <>
          <div className="heading">Existing surveys</div>
          <ul>
            {surveys.map((survey) => (
              <li
                key={survey.id}
                className="text__icon"
                onClick={() => {
                  navigate(`/surveys/${survey.id.toString()}`);
                }}
              >
                {survey.title}
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return <div className="heading">No surveys!</div>;
    }
  };

  return <div className="SurveysContainer">{renderSurveys()}</div>;
};

export default SurveysContainer;
