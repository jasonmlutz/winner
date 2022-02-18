import React, { useState, useEffect, useContext, createRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewResponse = () => {
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

  const { currentUser } = useContext(CurrentUserContext);
  const params = useParams();
  const survey_id = params.survey_id.toString();

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
    fetchData(`/api/surveys/${survey_id}`, setSurvey);
    fetchData(`/api/surveys/${survey_id}/questions`, setQuestions);
    fetchData(`/api/surveys/${survey_id}/response_options`, setResponseOptions);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return (
      <form>
        {filteredSortedResponseOptions.map((responseOption) => (
          <div className="py-1 md:py-2 mx-1 md:mx-2" key={responseOption.id}>
            <label className="">
              <input
                className="checked:underline"
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
      <>
        <Helmet helmetData={helmetData}>
          <title>New Response - Winner</title>
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
                      {survey.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-200 italic">
                      Author:{" "}
                      <a
                        className="underline hover:text-white"
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/users/${survey.author_id}`);
                        }}
                      >
                        {survey.author_name}
                      </a>
                    </p>
                  </li>
                  {renderQuestions()}
                  <li>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </li>
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
          <title>New Response - Winner</title>
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

export default NewResponse;
