import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

const NewResponseOptionForm = ({ parent_id, grandparent_id, siblingCount }) => {
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.length) {
      const token = document.querySelector("[name=csrf-token]").content;
      await fetch(`/api/v1/questions/${parent_id}/response_options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: title,
          position: siblingCount + 1,
          grandparent_id: grandparent_id,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      navigate(`/surveys/${grandparent_id}/${Date.now()}`);
      setTitle("");
      inputRef.current.blur();
    } else {
      alert("please name your response option!");
    }
  }

  return (
    <div className="NewResponseOptionForm">
      <form className="input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Create a new response option!"
          className="input__box input__box--small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="input__submit input__submit--right-anchor input__submit--small"
          type="submit"
          onClick={handleSubmit}
        >
          GO
        </button>
      </form>
    </div>
  );
};

export default NewResponseOptionForm;
