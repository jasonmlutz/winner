import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import QuestionsContainer from "../Questions/QuestionsContainer";

const SurveyDisplay = () => {
  const [survey, setSurvey] = useState("");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [editActive, setEditActive] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

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
        <div className="text__title text__title--large">
          {title}, by {survey.author_name}
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
      );
    }
  };
  return (
    <div className="SurveyDisplay">
      {renderSurvey()}
      <QuestionsContainer parent_id={id} />
    </div>
  );
};

export default SurveyDisplay;
