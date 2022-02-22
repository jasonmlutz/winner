import React, { useState, useRef, useEffect, createRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Helmet, HelmetData } from "react-helmet-async";
import { AiOutlineCheckCircle } from "react-icons/ai";

const helmetData = new HelmetData({});

import QuestionsContainer from "../Questions/QuestionsContainer";
import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

import NotFound from "../NotFound";

const SurveyDisplay = () => {
  const [survey, setSurvey] = useState(null);
  const [title, setTitle] = useState("");
  const [editActive, setEditActive] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id.toString();

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const ref = createRef();

  const [hideHeader, setHideHeader] = useState(false);
  function handleScroll(e) {
    setShowScrollTopButton(e.target.scrollTop > 300);
    setHideHeader(e.target.scrollTop > 300);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/surveys/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const survey = await response.json();
      if (!survey) {
        window.alert(`Survey with id ${id} not found`);
        navigate("/surveys/new");
        return;
      }

      setSurvey(survey);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  useEffect(() => {
    if (survey && survey.title) {
      setTitle(survey.title);
    }
  }, [survey]);

  async function handleDelete() {
    const token = document.querySelector("[name=csrf-token]").content;
    await fetch(`/api/surveys/${id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": token,
      },
    }).catch((error) => {
      window.alert(error);
      return;
    });

    navigate(`/users/${survey.author_id}`);
  }

  const inputRef = useRef(null);

  async function handleEditSubmit(e) {
    e.preventDefault();
    if (title.length) {
      const token = document.querySelector("[name=csrf-token]").content;
      // db push
      await fetch(`/api/surveys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: title,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      navigate(`/surveys/edit/${id}/${Date.now()}`);
      setEditActive(false);
    } else {
      alert("please name your survey!");
    }
  }

  async function handlePublish() {
    alert("check for valid survey");
    const token = document.querySelector("[name=csrf-token]").content;
    // db push
    await fetch(`/api/surveys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": token,
      },
      body: JSON.stringify({
        publish: true,
      }),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    navigate(`/surveys/${id}`);
  }

  useEffect(() => {
    if (editActive) {
      inputRef.current.focus();
    }
  }, [editActive]);

  if (survey) {
    // the fetch returned a (possibly empty) object
    if (survey.id) {
      // a valid survey was returned;
      // render depending on survey.publish and editActive
      if (survey.publish) {
        return (
          <>
            <Helmet helmetData={helmetData}>
              <title>New Survey - Winner</title>
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
                          This survey is live and may no longer be edited.{" "}
                          <Link
                            to={`/surveys/${survey.id}`}
                            className="text-sm text-blue-500 underline hover:text-blue-700"
                          >
                            View live survey
                          </Link>
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <Helmet helmetData={helmetData}>
              <title>New Survey - Winner</title>
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
                        {editActive ? (
                          <form className="flex flex-row">
                            <input
                              ref={inputRef}
                              type="text"
                              className="flex-1 text-black rounded-md px-2 mr-2"
                              value={title}
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            />
                            <button
                              className="hidden md:display px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                              type="submit"
                              onClick={handleEditSubmit}
                            >
                              Update
                            </button>
                            <button
                              onClick={handleEditSubmit}
                              type="submit"
                              className="display md:hidden rounded-full p-0 bg-indigo-500 text-white text-3xl hover:bg-indigo-700"
                            >
                              <AiOutlineCheckCircle />
                            </button>
                          </form>
                        ) : (
                          <div className="flex flex-row justify-between">
                            <h3 className="text-lg leading-6 font-medium text-white">
                              {survey.title}
                            </h3>
                            <div className="flex flex-row text-white text-xl">
                              <AiFillEdit
                                className="mx-2 cursor-pointer hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded-md"
                                onClick={() => {
                                  setEditActive(true);
                                }}
                              />
                              <AiFillDelete
                                className="mx-2 cursor-pointer hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded-md"
                                onClick={() => handleDelete()}
                              />
                            </div>
                          </div>
                        )}
                      </li>
                      <QuestionsContainer parent_id={id} />
                      <li>
                        <button
                          type="submit"
                          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          onClick={handlePublish}
                        >
                          Publish
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    } else {
      // no survey found; 404
      return (
        <NotFound
          path="/profile"
          notFoundMessage="Survey not found"
          navLinkMessage="Return to profile"
        />
      );
    }
  } else {
    // fetch in progress (or very bad server error), show loading skeleton
    return <>LOADING ...</>;
  }
};

export default SurveyDisplay;
