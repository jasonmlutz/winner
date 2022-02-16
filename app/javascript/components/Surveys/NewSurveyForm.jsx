import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewSurveyForm = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (title && currentUser) {
      // get the csrf token
      const token = document.querySelector("[name=csrf-token]").content;
      // send the post request
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: title,
          author_id: currentUser.id,
        }),
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const survey = await response.json();
      if (!survey) {
        window.alert(`Survey not created!`);
        return;
      }

      navigate(`/surveys/edit/${survey.id}`);
    } else {
      alert("please register/login and/or name your survey!");
    }
  }

  if (currentUser) {
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
  } else {
    return (
      <div className="NewSurveyForm">
        <div className="heading">Create a survey!</div>
        <div className="text__title text__title--medium">
          You must log in to create a survey.{" "}
          <Link to="/login?source=new-survey">LOG IN</Link>{" "}
        </div>
      </div>
    );
  }
};

export default NewSurveyForm;
