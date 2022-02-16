import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResponseDisplay = () => {
  const params = useParams();
  const response_id = params.response_id.toString();

  const [response, setResponse] = useState({});
  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState({});
  const [responseOptions, setResponseOptions] = useState({});
  const [answers, setAnswers] = useState({});

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
    fetchData(`/api/responses/${response_id}`, setResponse);
  }, []);

  useEffect(() => {
    if (response.survey_id) {
      fetchData(`/api/surveys/${response.survey_id}`, setSurvey);
      fetchData(`/api/surveys/${response.survey_id}/questions`, setQuestions);
      fetchData(
        `/api/surveys/${response.survey_id}/response_options`,
        setResponseOptions
      );
      fetchData(`/api/responses/${response_id}/answers`, setAnswers);
    }
  }, [response]);

  const renderQuestions = () => {
    const sortedQuestions = questions.sort((a, b) => a.position - b.position);
    return (
      <ul>
        {sortedQuestions.map((question) => (
          <li key={question.id}>
            <div className="QuestionDisplay">
              <div className="text__title text__title--medium">
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
    const answer = answers.find(
      (element) => element.question_id === question.id
    );
    return (
      <ul>
        {filteredSortedResponseOptions.map((responseOption) => {
          let className =
            "ResponseOptionDisplay text__title text__title--small";
          if (responseOption.id === answer.response_option_id) {
            className += " darken-background";
          }
          return (
            <li key={responseOption.id} className={className}>
              {responseOption.title}
            </li>
          );
        })}
      </ul>
    );
  };

  if (
    Object.keys(survey).length &&
    Object.keys(questions).length &&
    Object.keys(responseOptions).length &&
    Object.keys(answers).length
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
          <br />
          Respondent:{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/users/${response.respondent_id}`);
            }}
          >
            {response.respondent_name}
          </a>
          <div className="QuestionsContainer">{renderQuestions()}</div>
        </div>
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

export default ResponseDisplay;
