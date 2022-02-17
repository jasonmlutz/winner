import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

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
                    <span className="display lg:hidden rounded-full absolute p-0 bg-indigo-500 top-4 right-4 text-white text-3xl">
                      <FiPlusCircle />
                    </span>
                    <span className="hidden lg:block px-4 py-2 text-xs xl:text-sm rounded-full text-white bg-indigo-500 absolute top-4 right-4">
                      {authoredSurveys.length
                        ? "Create another survey!"
                        : "Create your first survey!"}
                    </span>
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
                    <span className="block lg:hidden rounded-full absolute p-0 bg-indigo-500 top-4 right-4 text-white text-3xl">
                      <FiPlusCircle />
                    </span>
                    <span className="hidden lg:block px-4 py-2 text-xs xl:text-sm rounded-full text-white bg-indigo-500 absolute top-4 right-4">
                      {responses.length
                        ? "Respond to your first survey!"
                        : "Find more live surveys!"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
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
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 1</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 2</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 3</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
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
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 1</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 2</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 3</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
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
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 1</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 2</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
                    <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                      <p>Line 3</p>
                      <div className="flex items-end text-xs">34</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDisplay;
