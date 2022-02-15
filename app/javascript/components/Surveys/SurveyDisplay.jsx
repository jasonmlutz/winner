import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import QuestionsContainer from "../Questions/QuestionsContainer";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const SurveyDisplay = () => {
  const [survey, setSurvey] = useState("");
  const [title, setTitle] = useState("");
  const [editActive, setEditActive] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id.toString();

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

      navigate(`/surveys/${id}/${Date.now()}`);
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

  const renderSurvey = () => {
    if (editActive) {
      return (
        <form className="input">
          <input
            type="text"
            className="input__box input__box--medium"
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="input__submit input__submit--right-anchor input__submit--medium"
            type="submit"
            onClick={handleEditSubmit}
          >
            GO
          </button>
        </form>
      );
    } else {
      return (
        <>
          <div className="text__title text__title--large">
            {title}
            <div className="text__icon">
              <AiFillEdit
                onClick={() => {
                  setEditActive(true);
                }}
              />
            </div>
            <div className="text__icon">
              <AiFillDelete onClick={() => handleDelete()} />
            </div>
          </div>
          <div className="text__title--small">
            Author:{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/users/${survey.author_id}`);
              }}
            >
              {survey.author_name}
            </a>
          </div>
          <div className="text__title--small">
            This survey is {survey.publish ? "live." : "not live."}
          </div>
        </>
      );
    }
  };

  if (survey.publish) {
    return (
      <div className="SurveyDisplay">
        This survey is live and may no longer be edited, even by the author.
      </div>
    );
  } else {
    if (currentUser && currentUser.id === survey.author_id) {
      return (
        <div className="SurveyDisplay">
          {renderSurvey()}
          <QuestionsContainer parent_id={id} />
          <button
            className="input__submit input__submit--large input__submit--wide"
            onClick={handlePublish}
          >
            PUBLISH
          </button>
        </div>
      );
    } else {
      return (
        <div className="SurveyDisplay">
          you must be logged in as the author to edit this survey
        </div>
      );
    }
  }
};

export default SurveyDisplay;
