import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";

const SurveysContainer = () => {
  const [surveys, setSurveys] = useState([{}]);
  const navigate = useNavigate();
  const [hideHeader, setHideHeader] = useState(false);
  var scrollTop = 0;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div
          className="relative py-[74px] h-screen overflow-auto"
          onScroll={(e) => {
            console.log(e.target.scrollTop > scrollTop);
            if (e.target.scrollTop > scrollTop) {
              setHideHeader(true);
            } else {
              setHideHeader(false);
            }
            scrollTop = e.target.scrollTop;
          }}
        >
          <div className="mx-auto w-full">
            <div className="pb-24 md:pt-12 px-4 md:px-6 flex flex-col items-center">
              <ul className="flex flex-col w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                {surveys.map((survey) => (
                  <li
                    key={survey.id}
                    className="border-gray-100 flex flex-row mb-2"
                  >
                    <div
                      className="w-full transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg
              hover:bg-gray-700 select-none cursor-pointer bg-gray-800 rounded-md p-4"
                    >
                      <div className="px-1 flex flex-col">
                        <div className="font-medium text-white">
                          {survey.title}
                        </div>
                        <div className="text-sm italic text-gray-100 my-2">
                          Author: {survey.author_name}
                        </div>
                      </div>
                    </div>
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
