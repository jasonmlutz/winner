import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

const NewUserForm = () => {
  const inputRef = useRef();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (name && password && password_confirmation) {
      if (password === password_confirmation) {
        const token = document.querySelector("[name=csrf-token]").content;
        // send the post request
        await fetch(`/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": token,
          },
          body: JSON.stringify({
            name: name,
            password: password,
            password_confirmation: password_confirmation,
          }),
        }).catch((error) => {
          window.alert(error);
          return;
        });

        navigate(`/users`);
        setName("");
        setPassword("");
        setPassword_confirmation("");
        inputRef.current.blur();
      } else {
        alert("password and password_confirmation do not match!");
      }
    } else {
      alert("please complete all three fields!");
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
        <input
          ref={inputRef}
          type="password"
          placeholder="password_confirmation"
          className="input__box input__box--medium"
          value={password_confirmation}
          onChange={(e) => {
            setPassword_confirmation(e.target.value);
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

export default NewUserForm;
