import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";

const SurveysContainer = () => {
  const [surveys, setSurveys] = useState([]);
  const [hovered, setHovered] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`/api/surveys/`);

  //     if (!response.ok) {
  //       const message = `An error has occurred: ${response.statusText}`;
  //       window.alert(message);
  //       return;
  //     }

  //     const data = await response.json();
  //     if (!data) {
  //       window.alert(`No surveys found!`);
  //       return;
  //     }

  //     setSurveys(data);
  //   }

  //   fetchData();
  //   return;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [navigate]);

  // const renderSurveys = () => {
  //   if (surveys.length) {
  //     return (
  //       <>
  //         <div className="heading">Live surveys</div>
  //         <ul>
  //           {surveys.map((survey) => {
  //             if (survey.publish) {
  //               return (
  //                 <li
  //                   key={survey.id}
  //                   className={
  //                     hovered === survey.id
  //                       ? "text__icon darken-background"
  //                       : "text__icon"
  //                   }
  //                   onMouseEnter={(e) => {
  //                     setHovered(survey.id);
  //                   }}
  //                   onMouseLeave={(e) => {
  //                     setHovered("");
  //                   }}
  //                   onClick={() => {
  //                     navigate(`/surveys/live/${survey.id.toString()}`);
  //                   }}
  //                 >
  //                   {survey.title}
  //                 </li>
  //               );
  //             }
  //           })}
  //         </ul>
  //       </>
  //     );
  //   } else {
  //     return <div className="heading">No surveys!</div>;
  //   }
  // };

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Surveys - Winner</title>
      </Helmet>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
          className="absolute h-full w-full object-cover"
        />
        <Header />
        <div className="flex items-start justify-between relative py-[74px]"></div>
        <div className="container flex flex-col mx-auto w-full items-center justify-center">
          {/* <div className="px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              User database
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
              Details and informations about user.
            </p>
          </div> */}
          <ul className="flex flex-col">
            <li className="border-gray-400 flex flex-row mb-2">
              <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 md:mr-16">
                  <div className="font-medium dark:text-white">Jean Marc</div>
                  <div className="text-gray-600 dark:text-gray-200 text-sm">
                    Developer
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-200 text-xs">
                  6:00 AM
                </div>
                <button className="w-24 text-right flex justify-end">
                  <svg
                    width="12"
                    fill="currentColor"
                    height="12"
                    className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SurveysContainer;
