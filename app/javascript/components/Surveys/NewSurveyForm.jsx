import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewSurveyForm = () => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [authorId, setAuthorId] = useState();
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users`);

      if (!response.ok) {
        const message = `An error has occurred fetching users: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const users = await response.json();
      if (!users) {
        window.alert(`no users found!`);
        navigate("/users/new");
        return;
      }

      setUsers(users);
    }

    fetchData();

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (title && currentUser) {
      // get the csrf token
      const token = document.querySelector("[name=csrf-token]").content;
      // send the post request
      await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: title,
          author_id: currentUser.id,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      navigate(`/`);
    } else {
      alert("please register/login and/or name your survey!");
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
