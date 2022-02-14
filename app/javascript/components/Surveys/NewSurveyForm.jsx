import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const NewSurveyForm = () => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [authorId, setAuthorId] = useState();
  const navigate = useNavigate();

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
    if (title && authorId) {
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
          author_id: authorId,
        }),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      navigate(`/`);
    } else {
      alert("please name your survey and select an author!");
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
      <select
        className="input__box input__box--large"
        defaultValue={authorId || "default"}
        onChange={(e) => {
          setAuthorId(e.target.value);
        }}
      >
        <option value="default" disabled hidden>
          --SELECT --
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewSurveyForm;
