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
      await fetch(`/api/questions/${parent_id}/response_options`, {
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
    <form className="flex flex-row">
      <input
        className="flex-1 text-black rounded-md px-2 mr-2"
        ref={inputRef}
        type="text"
        placeholder="Create a new response option"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        type="submit"
        onClick={handleSubmit}
      >
        Create
      </button>
    </form>
  );
};

export default NewResponseOptionForm;
