import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewResponse = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const params = useParams();
  const survey_id = params.survey_id.toString();

  const navigate = useNavigate();

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
    return (
      <form>
        {filteredSortedResponseOptions.map((responseOption) => (
          <div className="radio" key={responseOption.id}>
            <label className="ResponseOptionDisplay text__title text__title--small">
              <input
                title={responseOption.parent_id}
                type="radio"
                value={responseOption.id}
                checked={
                  answers[responseOption.parent_id] === responseOption.id
                }
                onChange={(e) => {
                  handleRadioChange(e);
                }}
              />
              {responseOption.title}
            </label>
          </div>
        ))}
      </form>
    );
  };

  const handleRadioChange = (e) => {
    setAnswers((prevState) => {
      return {
        ...prevState,
        [e.target.title]: e.target.value,
      };
    });
  };

  async function handleSubmit() {
    if (currentUser) {
      const token = document.querySelector("[name=csrf-token]").content;
      // send the post request
      const createResponseRes = await fetch("/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          survey_id: survey.id,
          respondent_id: currentUser.id,
        }),
      });

      if (!createResponseRes.ok) {
        const message = `An error has occurred: ${createResponseRes.statusText}`;
        window.alert(message);
        return;
      }

      const response = await createResponseRes.json();
      if (!response) {
        window.alert(`response not created!`);
        return;
      }

      const res = await fetch(`/api/responses/${response.id}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          response_option_ids: Object.values(answers),
        }),
      });

      if (!res.ok) {
        const message = `An error has occurred: ${res.statusText}`;
        window.alert(message);
        return;
      }

      const data = await res.json();
      if (!data) {
        window.alert(`answer to ${answer.question_id} not created!`);
        return;
      }

      navigate(`/responses/${response.id}`);
    } else {
      window.alert("you must be logged in to submit a response");
    }
  }

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
        <button
          onClick={() => handleSubmit()}
          className="input__submit input__submit--large input__submit--wide"
        >
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
