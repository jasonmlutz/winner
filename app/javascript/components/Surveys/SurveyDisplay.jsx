import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

// import QuestionsContainer from "../Questions/QuestionsContainer";

const SurveyDisplay = () => {
  const [title, setTitle] = useState("");
  const [editActive, setEditActive] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id.toString();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/v1/surveys/${id}`);

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

      setTitle(survey.title);
    }

    fetchData();

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, navigate]);

  async function handleDelete() {
    const token = document.querySelector("[name=csrf-token]").content;
    await fetch(`/api/v1/surveys/${id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": token,
      },
    }).catch((error) => {
      window.alert(error);
      return;
    });

    // await fetch(`/api/v1/surveys/${id}/questions`, {
    //   method: "DELETE",
    // }).catch((error) => {
    //   window.alert(error);
    //   return;
    // });

    // await fetch(`/api/v1/surveys/${id}/responseOptions`, {
    //   method: "DELETE",
    // }).catch((error) => {
    //   window.alert(error);
    //   return;
    // });

    navigate("/");
  }

  const inputRef = useRef(null);

  async function handleEditSubmit(e) {
    e.preventDefault();
    if (title.length) {
      // db push
      await fetch(`/api/v1/surveys/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          updatedAt: Date.now(),
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      navigate(`/surveys/${id}`);
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
      );
    }
  };
  return <div className="SurveyDisplay">{renderSurvey()}</div>;
  // return (
  //   <div className="SurveyDisplay">
  //     {renderSurvey()}
  //     <QuestionsContainer parentId={id} />
  //   </div>
  // );
};

export default SurveyDisplay;