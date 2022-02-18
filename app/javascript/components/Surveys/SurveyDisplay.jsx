import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createRef,
} from "react";
import { useParams, useNavigate } from "react-router";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import QuestionsContainer from "../Questions/QuestionsContainer";
import Header from "../Header";
import ScrollToTopButton from "../resources/ScrollToTopButton";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const SurveyDisplay = () => {
  const [survey, setSurvey] = useState("");
  const [title, setTitle] = useState("");
  const [editActive, setEditActive] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id.toString();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, navigate]);

  useEffect(() => {
    setTitle(survey.title);
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

    navigate("/");
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

    navigate(`/surveys/${id}/${Date.now()}`);
  }

  useEffect(() => {
    if (editActive) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editActive]);

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
            <div className="pb-24 md:pt-12 px-4 md:px-6 flex flex-col items-center">
              <ul className="flex flex-col w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                <li className="px-4 py-5 sm:px-6 w-full border bg-gray-800 shadow mb-2 rounded-md">
                  {survey.publish ? (
                    <h3 className="text-lg leading-6 font-medium text-white">
                      This survey is live and may no longer be edited.{" "}
                      <a
                        href=""
                        className="text-sm text-blue-500 underline hover:text-blue-700"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/surveys/${survey.id}`);
                        }}
                      >
                        View live survey
                      </a>
                    </h3>
                  ) : editActive ? (
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
                        className="px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        type="submit"
                        onClick={handleEditSubmit}
                      >
                        Go
                      </button>
                    </form>
                  ) : (
                    <h3 className="text-lg leading-6 font-medium text-white">
                      {survey.title}
                    </h3>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // const renderSurvey = () => {
  //   if (editActive) {
  //     return (
  // <form className="input">
  //   <input
  //     type="text"
  //     className="input__box input__box--medium"
  //     ref={inputRef}
  //     value={title}
  //     onChange={(e) => setTitle(e.target.value)}
  //   />
  //   <button
  //     className="input__submit input__submit--right-anchor input__submit--medium"
  //     type="submit"
  //     onClick={handleEditSubmit}
  //   >
  //     GO
  //   </button>
  // </form>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <div className="text__title text__title--large">
  //           {title}
  //           <div className="text__icon">
  //             <AiFillEdit
  //               onClick={() => {
  //                 setEditActive(true);
  //               }}
  //             />
  //           </div>
  //           <div className="text__icon">
  //             <AiFillDelete onClick={() => handleDelete()} />
  //           </div>
  //         </div>
  //         <div className="text__title--small">
  //           Author:{" "}
  //           <a
  //             href="#"
  //             onClick={(e) => {
  //               e.preventDefault();
  //               navigate(`/users/${survey.author_id}`);
  //             }}
  //           >
  //             {survey.author_name}
  //           </a>
  //         </div>
  //         <div className="text__title--small">
  //           This survey is {survey.publish ? "live." : "not live."}
  //         </div>
  //       </>
  //     );
  //   }
  // };

  // if (survey.publish) {
  //   return (
  //     <div className="SurveyDisplay">
  //       This survey is live and may no longer be edited, even by the author.
  //     </div>
  //   );
  // } else {
  //   if (currentUser && currentUser.id === survey.author_id) {
  //     return (
  //       <div className="SurveyDisplay">
  //         {renderSurvey()}
  //         <QuestionsContainer parent_id={id} />
  //         <button
  //           className="input__submit input__submit--large input__submit--wide"
  //           onClick={handlePublish}
  //         >
  //           PUBLISH
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="SurveyDisplay">
  //         you must be logged in as the author to edit this survey
  //       </div>
  //     );
  //   }
  // }
};

export default SurveyDisplay;
