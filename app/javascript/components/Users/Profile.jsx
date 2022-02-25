import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { Helmet, HelmetData } from "react-helmet-async";

import Layout from "../Layout";
import InformationModal from "../resources/InformationModal";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Profile = () => {
  const [authoredSurveys, setAuthoredSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [user, setUser] = useState({ name: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const helmetData = new HelmetData({});

  const navigate = useNavigate();

  const { currentUser } = useContext(CurrentUserContext);
  const user_id = currentUser.id;

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
    fetchData(`/api/users/${user_id}`, setUser);
  }, [user_id, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const source = searchParams.get("source");
    if (source === "delete") {
      navigate("/profile");
      setModalVisible(true);
    }
    if (source === "register") {
      setWelcomeMessage("Welcome, ");
    } else {
      setWelcomeMessage("Welcome back, ");
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchData(`/api/users/${user_id}/surveys`, setAuthoredSurveys);
      fetchData(`/api/users/${user_id}/responses`, setResponses);
    }
  }, [user]);

  if (user.id) {
    return (
      <>
        <InformationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={"Survey deleted!"}
          type="check"
        />
        <Layout classes=" flex items-start justify-between">
          <Helmet helmetData={helmetData}>
            <title>{user.name} - Winner</title>
          </Helmet>
          <div className="flex flex-col w-full md:space-y-4">
            <div className="h-screen pb-24 px-4 md:px-6">
              <h1 className="text-4xl font-semibold text-white">
                {welcomeMessage}
                {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
              </h1>
              <h2 className="text-md text-gray-400">
                Here's a summary of your activity.
              </h2>
              <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                <div className="flex items-center w-full md:w-2/3 space-x-4">
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-gray-800 relative">
                      <p className="text-2xl text-white font-bold">
                        {authoredSurveys.length || "0"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Authored survey
                        {authoredSurveys.length === 1 ? "" : "s"}
                      </p>
                      <Link
                        to={"/surveys/new"}
                        className="display lg:hidden rounded-full absolute p-0 bg-indigo-500 top-4 right-4 text-white text-3xl hover:bg-indigo-700"
                      >
                        <FiPlusCircle />
                      </Link>
                      <Link
                        to={"/surveys/new"}
                        className="hidden lg:block px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 absolute top-4 right-4 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        {authoredSurveys.length
                          ? "Create another survey!"
                          : "Create your first survey!"}
                      </Link>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-gray-800 relative">
                      <p className="text-2xl text-white font-bold">
                        {responses.length || "0"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Response{responses.length === 1 ? "" : "s"} submitted
                      </p>
                      <Link
                        to={"/surveys"}
                        className="block lg:hidden rounded-full absolute p-0 bg-indigo-500 top-4 right-4 text-white text-3xl hover:bg-indigo-700"
                      >
                        <FiPlusCircle />
                      </Link>
                      <Link
                        to={"/surveys"}
                        className="hidden lg:block px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 absolute top-4 right-4 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        {responses.length
                          ? "Find more live surveys!"
                          : "Respond to your first survey!"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-gray-800 relative">
                    <p className="text-sm w-max text-white font-semibold border-b border-gray-200">
                      Your Live Surveys
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-white font-bold">
                        {authoredSurveys.filter((elem) => elem.publish).length}
                      </p>
                    </div>
                    <div className="text-white">
                      {authoredSurveys
                        .filter((elem) => elem.publish)
                        .map((survey) => (
                          <div
                            key={survey.id}
                            className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200"
                          >
                            <Link
                              className="hover:underline flex items-end text-s"
                              to={`/surveys/${survey.id}`}
                            >
                              {survey.title}
                            </Link>
                            <Link
                              className="text-blue-500 underline hover:text-blue-700 flex items-end text-xs"
                              to={`/surveys/${survey.id}/responses`}
                            >
                              responses
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-gray-800 relative">
                    <p className="text-sm w-max text-white font-semibold border-b border-gray-200">
                      Your Unpublished Surveys
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-white font-bold">
                        {authoredSurveys.filter((elem) => !elem.publish).length}
                      </p>
                    </div>
                    <div className="text-white">
                      {authoredSurveys
                        .filter((elem) => !elem.publish)
                        .map((survey) => (
                          <div
                            key={survey.id}
                            className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200"
                          >
                            <Link
                              className="hover:underline flex items-end text-s"
                              to={`/surveys/edit/${survey.id}`}
                            >
                              {survey.title}
                            </Link>
                            <Link
                              className="text-blue-500 underline hover:text-blue-700 flex items-end text-xs"
                              to={`/surveys/edit/${survey.id}`}
                            >
                              edit
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-full pb-4">
                  <div className="shadow-lg px-4 py-6 w-full bg-gray-800 relative">
                    <p className="text-sm w-max text-white font-semibold border-b border-gray-200">
                      Your Responses
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
                            className="hover:underline"
                            to={`/surveys/${response.survey_id}`}
                          >
                            {response.survey_title}
                          </Link>
                          <Link
                            className="flex items-end text-xs text-blue-500 underline hover:text-blue-700"
                            to={`/responses/${response.id}`}
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
      </>
    );
  } else {
    if (user.error === "record(s) not found") {
      return <NotFound path={"/users"} />;
    } else {
      // loading skeleton
      return (
        <Layout classes="flex items-start justify-between">
          <Helmet helmetData={helmetData}>
            <title>loading ...</title>
          </Helmet>
          <div className="flex flex-col w-full md:space-y-4">
            <div className="h-screen pb-24 px-4 md:px-6">
              <h1 className="text-4xl font-semibold text-white">Loading ...</h1>
              <h2 className="text-md text-gray-400"></h2>
              <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                <div className="flex items-center w-full md:w-2/3 space-x-4">
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-gray-800 opacity-90 rounded animate-pulse relative h-[100px]"></div>
                  </div>
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-gray-800 opacity-90 rounded animate-pulse relative h-[100px]"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-gray-800 opacity-90 rounded animate-pulse relative h-[165px]"></div>
                  <div className="text-white"></div>
                </div>
              </div>
              <div className="w-full">
                <div className="shadow-lg px-4 py-6 w-full bg-gray-800 opacity-90 rounded animate-pulse relative h-[165px]"></div>
                <div className="text-white"></div>
              </div>
            </div>
            <div className="w-full pb-4">
              <div className="shadow-lg px-4 py-6 w-full bg-gray-800 opacity-90 rounded animate-pulse relative h-[165px]"></div>
              <div className="text-white"></div>
            </div>
          </div>
        </Layout>
      );
    }
  }
};

export default Profile;
