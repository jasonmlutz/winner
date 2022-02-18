import React, { useEffect, useState, createRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

const ResponseDisplay = () => {
  const params = useParams();
  const response_id = params.response_id.toString();

  const [response, setResponse] = useState({});
  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState({});
  const [responseOptions, setResponseOptions] = useState({});
  const [answers, setAnswers] = useState({});

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const ref = createRef();

  const [hideHeader, setHideHeader] = useState(false);
  // var scrollTop = 0;
  function handleScroll(e) {
    setShowScrollTopButton(e.target.scrollTop > 300);
    setHideHeader(e.target.scrollTop > 300);
    // setHideHeader(e.target.scrollTop > scrollTop);
    // scrollTop = e.target.scrollTop;
  }

  const navigate = useNavigate();

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
    return sortedQuestions.map((question) => (
      <li key={question.id} className="border-gray-100 flex flex-row mb-2">
        <div className="w-full shadow select-none bg-gray-800 rounded-md p-2 md:p-4">
          <div className="px-1 flex flex-col">
            <div className="font-medium text-white">{question.title}</div>
          </div>
          <div className="w-full flex flex-column justify-start w-full bg-gray-500 text-gray-100 rounded-md my-4 p-2">
            {renderResponseOptions(question)}
          </div>
        </div>
      </li>
    ));
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
          var className = "py-1 md:py-2 mx-1 md:mx-2";
          className +=
            answer.response_option_id === responseOption.id
              ? " bg-gray-700"
              : "";
          return (
            <li className={className} key={responseOption.id}>
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
      <>
        <Helmet helmetData={helmetData}>
          <title>Response - Winner</title>
        </Helmet>
        <div className="bg-indigo-900 relative overflow-hidden h-screen">
          <img
            src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
            className="absolute h-full w-full object-cover"
          />
          <Header hideHeader={hideHeader} />
          <ScrollToTopButton visible={showScrollTopButton} ref={ref} />
          <div
            ref={ref}
            className="relative py-[74px] h-screen overflow-auto"
            onScroll={(e) => handleScroll(e)}
          >
            <div className="mx-auto w-full">
              <div className="pb-24 md:pt-12 px-2 md:px-6 flex flex-col items-center">
                <ul className="flex flex-col w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                  <li className="px-4 py-5 sm:px-6 w-full border bg-gray-800 shadow mb-2 rounded-md">
                    <h3 className="text-lg leading-6 font-medium text-white">
                      <a
                        className="text-blue-500 underline hover:text-blue-700"
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/surveys/${survey.id}`);
                        }}
                      >
                        {survey.title}
                      </a>
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-200 italic">
                      Author:{" "}
                      <a
                        className="text-blue-500 underline hover:text-blue-700"
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/users/${survey.author_id}`);
                        }}
                      >
                        {survey.author_name}
                      </a>
                    </p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-200 italic">
                      Respondent:{" "}
                      <a
                        className="text-blue-500 underline hover:text-blue-700"
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/users/${survey.author_id}`);
                        }}
                      >
                        {response.respondent_name}
                      </a>
                    </p>
                  </li>
                  {renderQuestions()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet helmetData={helmetData}>
          <title>Response - Winner</title>
        </Helmet>
        <div className="bg-indigo-900 relative overflow-hidden h-screen">
          <img
            src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
            className="absolute h-full w-full object-cover"
          />
          <Header hideHeader={hideHeader} />
          <ScrollToTopButton visible={showScrollTopButton} ref={ref} />
          <div
            ref={ref}
            className="relative py-[74px] h-screen overflow-auto"
            onScroll={(e) => handleScroll(e)}
          >
            <div className="mx-auto w-full">
              <div className="pb-24 md:pt-12 px-2 md:px-6 flex flex-col items-center">
                <ul className="flex flex-col w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                  <li className="px-4 py-5 sm:px-6 w-full border bg-gray-800 shadow mb-2 rounded-md">
                    <h3 className="text-lg leading-6 font-medium text-white">
                      {"LOADING ...."}
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ResponseDisplay;
