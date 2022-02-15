import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewResponse = () => {
  const params = useParams();
  const survey_id = params.survey_id.toString();

  const navigate = useNavigate();

  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState({});
  const [responseOptions, setResponseOptions] = useState({});

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
    fetchData(`/api/surveys/${survey_id}`, setSurvey);
    fetchData(`/api/surveys/${survey_id}/questions`, setQuestions);
    fetchData(`/api/surveys/${survey_id}/response_options`, setResponseOptions);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderQuestions = () => {
    const sortedQuestions = questions.sort((a, b) => a.position - b.position);
    return (
      <ul>
        {sortedQuestions.map((question) => (
          <li key={question.id}>
            <div className="QuestionDisplay">
              <div className="text__title text__title--small">
                {question.title}
              </div>
              <div className="ResponseOptionsContainer">
                {renderResponseOptions(question)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderResponseOptions = (question) => {
    const filteredSortedResponseOptions = responseOptions
      .filter((element) => element.parent_id === question.id)
      .sort((a, b) => a.position - b.position);
    return (
      <ul>
        {filteredSortedResponseOptions.map((responseOption) => (
          <li key={responseOption.id}>
            <div className="ResponseOptionDisplay text__title text__title--small">
              {responseOption.title}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  if (
    Object.keys(survey).length &&
    Object.keys(questions).length &&
    Object.keys(responseOptions).length
  ) {
    return (
      <div className="SurveyDisplay">
        <div className="text__title text__title--large">{survey.title}</div>
        <div className="text__title--small">
          Author:{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/users/${survey.author_id}`);
            }}
          >
            {survey.author_name}
          </a>
          <div className="QuestionsContainer">{renderQuestions()}</div>
        </div>
        <button className="input__submit input__submit--large input__submit--wide">
          SUBMIT
        </button>
      </div>
    );
  } else {
    return (
      <div className="SurveyDisplay">
        <div className="text__title text__title--small">
          Data not fully loaded for survey
        </div>
      </div>
    );
  }
};

export default NewResponse;
