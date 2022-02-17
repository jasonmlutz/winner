import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { Helmet } from "react-helmet";

import Header from "../Header";

const UserDisplay = () => {
  const [authoredSurveys, setAuthoredSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [hovered, setHovered] = useState("");
  const [user, setUser] = useState({ name: "" });
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
    fetchData(`/api/users/${id}/surveys`, setAuthoredSurveys);
    fetchData(`/api/users/${id}/responses`, setResponses);
  }, [params.user_id, navigate]);

  return (
    <>
      <Helmet>
        <title>{user.name} - Winner</title>
      </Helmet>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
          className="absolute h-full w-full object-cover"
        />
        <Header />
        <div className="flex items-start justify-between relative py-[74px]">
          <div className="flex flex-col w-full md:space-y-4">
            <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Welcome back,{" "}
                {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
              </h1>
              <h2 className="text-md text-gray-400">
                Here's a summary of your activity.
              </h2>
              <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                <div className="flex items-center w-full md:w-2/3 space-x-4">
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                      <p className="text-2xl text-black dark:text-white font-bold">
                        {authoredSurveys.length || "0"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Authored survey{authoredSurveys.length === 1 ? "" : "s"}
                      </p>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("#");
                        }}
                        className="display lg:hidden rounded-full absolute p-0 bg-indigo-500 top-4 right-4 text-white text-3xl hover:bg-indigo-700"
                      >
                        <FiPlusCircle />
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("#");
                        }}
                        className="hidden lg:block px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 absolute top-4 right-4 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        {authoredSurveys.length
                          ? "Create another survey!"
                          : "Create your first survey!"}
                      </a>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                      <p className="text-2xl text-black dark:text-white font-bold">
                        {responses.length || "0"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Response{responses.length === 1 ? "" : "s"} submitted
                      </p>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/surveys");
                        }}
                        className="block lg:hidden rounded-full absolute p-0 bg-indigo-500 top-4 right-4 text-white text-3xl hover:bg-indigo-700"
                      >
                        <FiPlusCircle />
                      </a>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/surveys");
                        }}
                        className="hidden lg:block px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 absolute top-4 right-4 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        {responses.length
                          ? "Find more live surveys!"
                          : "Respond to your first survey!"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Your Live Surveys
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        {authoredSurveys.filter((elem) => elem.publish).length}
                      </p>
                    </div>
                    <div className="dark:text-white">
                      {authoredSurveys
                        .filter((elem) => elem.publish)
                        .map((survey) => (
                          <div
                            key={survey.id}
                            className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200"
                          >
                            <p>{survey.title}</p>
                            <div className="flex items-end text-xs">
                              responses
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Your Unpublished Surveys
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        {authoredSurveys.filter((elem) => !elem.publish).length}
                      </p>
                    </div>
                    <div className="dark:text-white">
                      {authoredSurveys
                        .filter((elem) => !elem.publish)
                        .map((survey) => (
                          <div
                            key={survey.id}
                            className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200"
                          >
                            <p>{survey.title}</p>
                            <div className="flex items-end text-xs">edit</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Your Responses
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        12
                      </p>
                    </div>
                    <div className="dark:text-white">
                      {responses.map((response) => (
                        <div
                          key={response.id}
                          className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200"
                        >
                          <p>{response.survey_title}</p>
                          <div className="flex items-end text-xs">view</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDisplay;
