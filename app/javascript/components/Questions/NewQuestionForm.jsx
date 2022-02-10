import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

const NewQuestionForm = ({ parentId, siblingCount }) => {
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.length) {
      // send the post request
      await fetch(`/api/v1/surveys/${parentId}/questions/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          position: siblingCount + 1,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      navigate(`/surveys/${parentId}/${Date.now().toString()}`);
      setTitle("");
      inputRef.current.blur();
    } else {
      alert("please name your question!");
    }
  }

  return (
    <div className="NewQuestionForm">
      <span className="input__title--medium">Create a new question!</span>
      <form className="input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter question title"
          className="input__box input__box--medium"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          className="input__submit input__submit--right-anchor input__submit--medium"
          type="submit"
          onClick={handleSubmit}
        >
          GO
        </button>
      </form>
    </div>
  );
};

export default NewQuestionForm;
