import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

const NewQuestionForm = ({ parent_id, siblingCount }) => {
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.length) {
      const token = document.querySelector("[name=csrf-token]").content;
      // send the post request
      await fetch(`/api/surveys/${parent_id}/questions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: title,
          position: siblingCount + 1,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      navigate(`/surveys/edit/${parent_id}/${Date.now()}`);
      setTitle("");
      inputRef.current.blur();
    } else {
      alert("please name your question!");
    }
  }

  return (
    <li className="border-gray-100 flex flex-row mb-2">
      <div className="w-full shadow select-none bg-gray-800 rounded-md p-4">
        <form className="flex flex-row">
          <input
            className="flex-1 text-black rounded-md px-2 mr-2"
            ref={inputRef}
            type="text"
            placeholder="Create a new question"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            type="submit"
            onClick={handleSubmit}
          >
            Create
          </button>
        </form>
      </div>
    </li>
  );
};

export default NewQuestionForm;
