import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

import NotFound from "../NotFound";
import Layout from "../Layout";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewResponse = () => {
  const helmetData = new HelmetData({});

  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [responseOptions, setResponseOptions] = useState(null);
  const [answers, setAnswers] = useState({});

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
        window.alert(`answers not created!`);
        return;
      }

      navigate(`/responses/${response.id}`);
    } else {
      window.alert("you must be logged in to submit a response");
    }
  }

  const renderLoading = () => {
    return (
      <Layout>
        <Helmet helmetData={helmetData}>
          <title>loading ...</title>
        </Helmet>
        <div className="mx-auto w-full">
          <div className="pb-24 md:pt-12 px-2 md:px-6 flex flex-col items-center">
            <ul className="flex flex-col w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
              <li className="px-4 py-5 sm:px-6 w-full border bg-gray-800 opacity-90 rounded animate-pulse shadow mb-2 rounded-md h-[100px]">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Loading ...
                </h3>
                <div className="mt-1 max-w-2xl text-sm text-gray-200 italic">
                  {""}
                  <div className="text-blue-500 underline hover:text-blue-700">
                    {""}
                  </div>
                </div>
                <div className="mt-1 max-w-2xl text-sm text-gray-200 italic">
                  <div className="text-blue-500 underline hover:text-blue-700">
                    {""}
                  </div>
                </div>
              </li>
              <li className="border-gray-100 flex flex-row mb-2">
                <div className="w-full shadow select-none bg-gray-800 opacity-90 rounded animate-pulse rounded-md p-2 md:p-4 h-[100px]">
                  <div className="px-1 flex flex-col">
                    <div className="font-medium text-white">{""}</div>
                  </div>
                  <div className="w-full flex flex-column justify-start w-full bg-gray-500 text-gray-100 rounded-md my-4 p-2 h-[60px]"></div>
                </div>
              </li>
              <li className="border-gray-100 flex flex-row mb-2">
                <div className="w-full shadow select-none bg-gray-800 opacity-90 rounded animate-pulse rounded-md p-2 md:p-4 h-[100px]">
                  <div className="px-1 flex flex-col">
                    <div className="font-medium text-white">{""}</div>
                  </div>
                  <div className="w-full flex flex-column justify-start w-full bg-gray-500 text-gray-100 rounded-md my-4 p-2 h-[60px]"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    );
  };

  if (survey) {
    // fetch returned (possible empty object)
    if (survey.id) {
      // valid survey returned
      if (questions && responseOptions) {
        // dependents also loaded; render!
      } else {
        // at least one dependent not yet loaded; loading!
        return renderLoading();
      }
      // render the response
      return (
        <Layout>
          <Helmet helmetData={helmetData}>
            <title>New Response - Winner</title>
          </Helmet>
          <div className="mx-auto w-full">
            <div className="pb-24 md:pt-12 px-2 md:px-6 flex flex-col items-center">
              <ul className="flex flex-col w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                <li className="px-4 py-5 sm:px-6 w-full border bg-gray-800 shadow mb-2 rounded-md">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    {survey.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-200 italic">
                    Author:{" "}
                    <Link
                      className="text-blue-500 underline hover:text-blue-700"
                      to={`/users/${survey.author_id}`}
                    >
                      {survey.author_name}
                    </Link>
                  </p>
                  <p className="mt-1 max-w-2xl text-sm text-gray-200 italic">
                    <Link
                      className="text-blue-500 underline hover:text-blue-700"
                      to={`/surveys/${survey.id}/responses`}
                    >
                      View all responses to this survey
                    </Link>
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
        </Layout>
      );
    } else {
      // no survey found; 404
      return (
        <NotFound
          path="/surveys"
          notFoundMessage="Survey not found"
          navLinkMessage="View all surveys"
        />
      );
    }
  } else {
    // fetch in progress (or bad server error); render loading skeleton
    return renderLoading();
  }
};

export default NewResponse;
