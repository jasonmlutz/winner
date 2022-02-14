import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

const NewSessionForm = () => {
  const inputRef = useRef();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (name && password) {
      const token = document.querySelector("[name=csrf-token]").content;
      // send the post request
      const response = await fetch(`/api/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user) {
        window.alert(`No user fetched!`);
        return;
      }
      console.log(user);

      sessionStorage.setItem("sessionToken", user.session_token);
      navigate(`/users/${user.id}`);
    } else {
      alert("password and password_confirmation do not match!");
    }
  }

  return (
    <div className="NewUserForm">
      <span className="input__title--medium">Register!</span>
      <form className="input">
        <input
          ref={inputRef}
          type="text"
          placeholder="name"
          className="input__box input__box--medium"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          ref={inputRef}
          type="password"
          placeholder="password"
          className="input__box input__box--medium"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="input__submit input__submit--medium"
          type="submit"
          onClick={handleSubmit}
        >
          GO
        </button>
      </form>
    </div>
  );
};
export default NewSessionForm;
