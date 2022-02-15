import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const NewResponse = () => {
  const params = useParams();
  const survey_id = params.survey_id.toString();

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

  return (
    <div>
      <div>Live Survey Display</div>
      <div>title: {survey.title}</div>
      <div>number of questions: {questions.length}</div>
      <div>number of response options: {responseOptions.length}</div>
    </div>
  );
};

export default NewResponse;
