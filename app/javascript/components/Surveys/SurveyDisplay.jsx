import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";
import { Helmet, HelmetData } from "react-helmet-async";

import QuestionsContainer from "../Questions/QuestionsContainer";

import Layout from "../Layout";
import NotFound from "../NotFound";
import ConfirmationModal from "../resources/ConfirmationModal";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const SurveyDisplay = () => {
  const [title, setTitle] = useState("");
  const [survey, setSurvey] = useState(null);
  const [publishStatus, setPublishStatus] = useState(null);
  const [editActive, setEditActive] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id.toString();

  const helmetData = new HelmetData({});

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
    fetchData(`/api/surveys/${id}`, setSurvey);
    fetchData(`/api/publish_status/${id}`, setPublishStatus);
    return;
  }, [navigate]);

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

    navigate("/profile");
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

  const questionsReady = () => {
    return publishStatus.number_of_questions > 0;
  };

  const responseOptionsReady = () => {
    return Object.values(publishStatus.response_options_status).every(
      (elem) => elem > 1
    );
  };

  const renderPublishButton = () => {
    if (questionsReady && responseOptionsReady()) {
      return (
        <button
          type="submit"
          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          onClick={handlePublish}
        >
          Publish
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="py-2 px-4 bg-gray-600 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg cursor-not-allowed"
          onClick={() => console.log("submit attempt")}
        >
          Publish
        </button>
      );
    }
  };

  if (survey) {
    // the fetch returned a (possibly empty) object
    if (survey.id) {
      // a valid survey was returned;
      // check for author:
      if (survey.author_id === currentUser.id) {
        // the author is the editor; render depending on publish and editActive
        if (survey.publish) {
          return (
            <Layout>
              <Helmet helmetData={helmetData}>
                <title>New Survey - Winner</title>
              </Helmet>
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
            </Layout>
          );
        } else {
          return (
            <>
              <ConfirmationModal
                deleteCallback={handleDelete}
                modalVisible={confirmationModalVisible}
                setModalVisible={setConfirmationModalVisible}
              />
              <Layout>
                <Helmet helmetData={helmetData}>
                  <title>New Survey - Winner</title>
                </Helmet>
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
                              className="hidden md:block px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                              type="submit"
                              onClick={handleEditSubmit}
                            >
                              Update
                            </button>
                            <button
                              onClick={handleEditSubmit}
                              type="submit"
                              className="block md:hidden rounded-full p-0 bg-indigo-500 text-white text-3xl hover:bg-indigo-700"
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
                                onClick={() =>
                                  setConfirmationModalVisible(true)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </li>
                      <QuestionsContainer parent_id={id} />
                      <li>{renderPublishButton()}</li>
                    </ul>
                  </div>
                </div>
              </Layout>
            </>
          );
        }
      } else {
        return <>you are not the owner of this survey!</>;
      }
      // render depending on survey.publish and editActive
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
    return (
      <Layout>
        <Helmet helmetData={helmetData}>
          <title>New Survey - Winner</title>
        </Helmet>
        <div className="mx-auto w-full">
          <div className="pb-24 md:pt-12 px-2 md:px-6 flex flex-col items-center">
            <ul className="flex flex-col w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
              <li className="px-4 py-5 sm:px-6 w-full border bg-gray-800 opacity-90 animate-pulse mb-2 rounded-md">
                <div className="flex flex-row justify-between">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    Loading ...
                  </h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
};

export default SurveyDisplay;
