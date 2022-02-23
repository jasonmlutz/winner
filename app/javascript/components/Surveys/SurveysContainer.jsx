import React, { useState, useEffect, createRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

const SurveysContainer = () => {
  const [surveys, setSurveys] = useState(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const navigate = useNavigate();
  const ref = createRef();

  const [hideHeader, setHideHeader] = useState(false);
  function handleScroll(e) {
    setShowScrollTopButton(e.target.scrollTop > 300);
    setHideHeader(e.target.scrollTop > 300);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/surveys/`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`No surveys found!`);
        return;
      }

      setSurveys(data);
    }

    fetchData();
    return;
  }, [navigate]);

  if (surveys) {
    // fetch returned a possibly empty array
    if (surveys.length) {
      // a non-empty array was returned; render
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
                    {surveys.map((survey) => (
                      <li
                        key={survey.id}
                        className="border-gray-100 flex flex-row mb-2"
                      >
                        <Link className="w-full" to={`/surveys/${survey.id}`}>
                          <div className="w-full transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-700 select-none bg-gray-800 rounded-md p-4">
                            <div className="px-1 flex flex-col">
                              <div className="font-medium text-white">
                                {survey.title}
                              </div>
                              <div className="text-sm italic text-gray-100 my-2">
                                Author: {survey.author_name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      // no surveys returned
      // TODO style no surveys exist message
      return <>NO SURVEYS EXIST</>;
    }
  } else {
    // fetch in progress or bad server error; render loading
    return (
      <>
        <Helmet helmetData={helmetData}>
          <title>loading ...</title>
        </Helmet>
        <div className="bg-indigo-900 relative overflow-hidden h-screen">
          <img
            src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
            className="absolute h-full w-full object-cover"
          />
          <Header hideHeader={hideHeader} />
          <div className="relative py-[74px] h-screen overflow-auto">
            <div className="mx-auto w-full">
              <div className="pb-24 md:pt-12 px-2 md:px-6 flex flex-col items-center">
                <ul className="flex flex-col w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                  <li className="border-gray-100 flex flex-row mb-2">
                    <div className="w-full">
                      <div className="w-full transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-700 select-none bg-gray-800 opacity-90 rounded animate-pulse p-4 h-[100px]">
                        <div className="px-1 flex flex-col">
                          <div className="font-medium text-white">
                            Loading ...
                          </div>
                          <div className="text-sm italic text-gray-100 my-2">
                            {""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="border-gray-100 flex flex-row mb-2">
                    <div className="w-full">
                      <div className="w-full transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-700 select-none bg-gray-800 opacity-90 rounded animate-pulse p-4 h-[100px]">
                        <div className="px-1 flex flex-col">
                          <div className="font-medium text-white">{""}</div>
                          <div className="text-sm italic text-gray-100 my-2">
                            {""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="border-gray-100 flex flex-row mb-2">
                    <div className="w-full">
                      <div className="w-full transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-700 select-none bg-gray-800 opacity-90 rounded animate-pulse p-4 h-[100px]">
                        <div className="px-1 flex flex-col">
                          <div className="font-medium text-white">{""}</div>
                          <div className="text-sm italic text-gray-100 my-2">
                            {""}
                          </div>
                        </div>
                      </div>
                    </div>
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

export default SurveysContainer;
