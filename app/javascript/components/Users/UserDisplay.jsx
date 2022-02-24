import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Layout from "../Layout";
import ScrollToTopButton from "../resources/ScrollToTopButton";
import NotFound from "../NotFound";

import Profile from "./Profile";

const UserDisplay = () => {
  const [liveAuthoredSurveys, setLiveAuthoredSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [user, setUser] = useState(null);

  const helmetData = new HelmetData({});

  const { currentUser } = useContext(CurrentUserContext);

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
  }, [params.user_id, navigate]);

  useEffect(() => {
    if (user && user.id) {
      fetchData(`/api/users/${id}/surveys`, setLiveAuthoredSurveys);
      fetchData(`/api/users/${id}/responses`, setResponses);
    }
  }, [user]);

  if (user) {
    // the fetch returned a (possibly empty) object
    if (user.id) {
      // a valid user object was returned
      if (user.id === currentUser.id) {
        // this is actually profile!
        return <Profile />;
      } else {
        return (
          <Layout classes=" flex items-start justify-between">
            <Helmet helmetData={helmetData}>
              <title>{user.name} - Winner</title>
            </Helmet>
            <div className="flex flex-col w-full md:space-y-4">
              <div className="h-screen pb-24 px-4 md:px-6">
                <h1 className="text-4xl font-semibold text-white">
                  All about{" "}
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
                </h1>
                <div className="flex items-center space-x-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                  <div className="w-full">
                    <div className="shadow-lg px-4 py-6 w-full bg-gray-800 relative">
                      <p className="text-sm w-max text-white font-semibold border-b border-gray-200">
                        Live Surveys
                      </p>
                      <div className="flex items-end space-x-2 my-6">
                        <p className="text-5xl text-white font-bold">
                          {
                            liveAuthoredSurveys.filter((elem) => elem.publish)
                              .length
                          }
                        </p>
                      </div>
                      <div className="text-white">
                        {liveAuthoredSurveys
                          .filter((elem) => elem.publish)
                          .map((survey) => (
                            <div
                              key={survey.id}
                              className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200"
                            >
                              <Link
                                to={`/surveys/${survey.id}`}
                                className="hover:underline flex items-end text-s"
                              >
                                {survey.title}
                              </Link>
                              <Link
                                to={`/surveys/${survey.id}/responses`}
                                className="text-blue-500 underline hover:text-blue-700 flex items-end text-xs"
                              >
                                responses
                              </Link>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full pb-4">
                    <div className="shadow-lg px-4 py-6 w-full bg-gray-800 relative">
                      <p className="text-sm w-max text-white font-semibold border-b border-gray-200">
                        Responses
                      </p>
                      <div className="flex items-end space-x-2 my-6">
                        <p className="text-5xl text-white font-bold">
                          {responses.length}
                        </p>
                      </div>
                      <div className="text-white">
                        {responses.map((response) => (
                          <div
                            key={response.id}
                            className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200"
                          >
                            <Link
                              to={`/surveys/${response.survey_id}`}
                              className="hover:underline"
                            >
                              {response.survey_title}
                            </Link>
                            <Link
                              to={`/responses/${response.id}`}
                              className="flex items-end text-xs text-blue-500 underline hover:text-blue-700"
                            >
                              view response
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        );
      }
    } else {
      // no user object found, 404
      return (
        <NotFound
          path="/users"
          notFoundMessage="User not found"
          navLinkMessage="View all users"
        />
      );
    }
  } else {
    // fetch in progress (or very bad server error), show loading skeleton
    return (
      <Layout classes="flex items-start justify-between">
        <Helmet helmetData={helmetData}>
          <title>loading ...</title>
        </Helmet>
        <div className="flex flex-col w-full md:space-y-4">
          <div className="h-screen pb-24 px-4 md:px-6">
            <h1 className="text-4xl font-semibold text-white">Loading ...</h1>
            <h2 className="text-md text-gray-400"></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
              <div className="w-full">
                <div className="shadow-lg px-4 py-6 w-full bg-gray-800 opacity-90 rounded animate-pulse relative h-[165px]"></div>
                <div className="text-white"></div>
              </div>
              <div className="w-full pb-4">
                <div className="shadow-lg px-4 py-6 w-full bg-gray-800 opacity-90 rounded animate-pulse relative h-[165px]"></div>
                <div className="text-white"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default UserDisplay;
