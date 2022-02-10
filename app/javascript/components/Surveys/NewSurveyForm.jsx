import React, { useState } from "react";
import { useNavigate } from "react-router";

const NewSurveyForm = () => {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.length) {
      // send the post request
      await fetch("/api/v1/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      navigate(`/`);
    } else {
      alert("please name your survey!");
    }
  }
  return (
    <div className="NewSurveyForm">
      <div className="heading">Create a survey!</div>
      <form className="input">
        <input
          type="text"
          placeholder="Enter survey title"
          className="input__box input__box--large"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          className="input__submit input__submit--right-anchor input__submit--large"
          type="submit"
          onClick={handleSubmit}
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default NewSurveyForm;
