import React, { useState, useEffect, createRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

const ResponsesContainer = () => {
  const [responses, setResponses] = useState([{}]);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const params = useParams();
  const survey_id = params.survey_id.toString();

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
      const response = await fetch(`/api/surveys/${survey_id}/responses`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`No responses found!`);
        return;
      }

      setResponses(data);
    }

    fetchData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Responses - Winner</title>
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
                    Survey: {responses[0].survey_title}
                  </h3>
                  <div className="text-sm text-gray-100 my-2">
                    <a
                      href=""
                      className="text-sm text-blue-500 underline hover:text-blue-700"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/surveys/${survey_id}`);
                      }}
                    >
                      View live survey
                    </a>
                  </div>
                </li>
                {responses.map((response) => (
                  <li
                    key={response.id}
                    className="border-gray-100 flex flex-row mb-2"
                  >
                    <a
                      className="w-full"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/responses/${response.id}`);
                      }}
                    >
                      <div className="w-full transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-700 select-none bg-gray-800 rounded-md p-4">
                        <div className="px-1 font-medium text-white">
                          View the response by {response.respondent_name}
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

export default ResponsesContainer;
