import React, { useState, useContext, createRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewSurveyForm = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const ref = createRef();

  const [hideHeader, setHideHeader] = useState(false);
  // var scrollTop = 0;
  function handleScroll(e) {
    setShowScrollTopButton(e.target.scrollTop > 300);
    setHideHeader(e.target.scrollTop > 300);
    // setHideHeader(e.target.scrollTop > scrollTop);
    // scrollTop = e.target.scrollTop;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (title && currentUser) {
      // get the csrf token
      const token = document.querySelector("[name=csrf-token]").content;
      // send the post request
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: title,
          author_id: currentUser.id,
        }),
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const survey = await response.json();
      if (!survey) {
        window.alert(`Survey not created!`);
        return;
      }

      navigate(`/surveys/edit/${survey.id}`);
    } else {
      alert("please register/login and/or name your survey!");
    }
  }

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
            <div className="pb-24 md:pt-12 px-4 md:px-6 flex flex-col items-center">
              <ul className="flex flex-col w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                <li className="px-4 py-5 sm:px-6 w-full border bg-gray-800 shadow mb-2 rounded-md">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    {currentUser ? (
                      <form className="input">
                        <input
                          type="text"
                          placeholder="Enter survey title"
                          className="input__box input__box--large"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        <button
                          className="input__submit input__submit--right-anchor input__submit--large"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Go
                        </button>
                      </form>
                    ) : (
                      <div>
                        You must log in to create a survey.{" "}
                        <Link to="/login?source=new-survey">Sign in</Link>
                      </div>
                    )}
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSurveyForm;
