import React, { useState, useEffect, createRef } from "react";
import { useNavigate } from "react-router";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

const SurveysContainer = () => {
  const [surveys, setSurveys] = useState([{}]);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const navigate = useNavigate();
  const ref = createRef();

  const [hideHeader, setHideHeader] = useState(false);
  // var scrollTop = 0;
  function handleScroll(e) {
    setShowScrollTopButton(e.target.scrollTop > 300);
    setHideHeader(e.target.scrollTop > 300);
    // setHideHeader(e.target.scrollTop > scrollTop);
    // scrollTop = e.target.scrollTop;
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
                    <a
                      className="w-full"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/surveys/${survey.id}`);
                      }}
                    >
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
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveysContainer;
