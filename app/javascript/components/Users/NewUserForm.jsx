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
        const response = await fetch(`/api/users`, {
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

        sessionStorage.setItem("sessionToken", user.session_token);
        setName("");
        setPassword("");
        setPassword_confirmation("");
        inputRef.current.blur();
        navigate(`/users/${user.id}`);
      } else {
        alert("password and password_confirmation do not match!");
      }
    } else {
      alert("please complete all three fields!");
    }
  }

  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
        className="absolute h-full w-full object-cover"
      />
      <div className="inset-0 bg-black opacity-75 absolute"></div>
      <div className="container mx-auto relative z-10 mt-20 w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5">
        <div className="flex flex-col content-center relative z-10">
          <div className="self-center mb-2 text-xl font-light text-gray-800 dark:text-white">
            Create a new account
          </div>
          <span className="self-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="#"
              target="_blank"
              className="text-sm text-blue-500 underline hover:text-blue-700"
            >
              Sign in
            </a>
          </span>
          <div className="p-6 mt-8">
            <form action="#">
              <div className="flex flex-col mb-2">
                <div className="relative ">
                  <input
                    type="text"
                    id="create-account-pseudo"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="pseudo"
                    placeholder="Pseudo"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="relative ">
                  <input
                    type="text"
                    id="create-account-email"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="flex w-full my-4">
                <button
                  type="submit"
                  className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // <div className="NewUserForm">
    //   <span className="input__title--medium">Register!</span>
    //   <form className="input">
    //     <input
    //       ref={inputRef}
    //       type="text"
    //       placeholder="name"
    //       className="input__box input__box--medium"
    //       value={name}
    //       onChange={(e) => {
    //         setName(e.target.value);
    //       }}
    //     />
    //     <input
    //       ref={inputRef}
    //       type="password"
    //       placeholder="password"
    //       className="input__box input__box--medium"
    //       value={password}
    //       onChange={(e) => {
    //         setPassword(e.target.value);
    //       }}
    //     />
    //     <input
    //       ref={inputRef}
    //       type="password"
    //       placeholder="password_confirmation"
    //       className="input__box input__box--medium"
    //       value={password_confirmation}
    //       onChange={(e) => {
    //         setPassword_confirmation(e.target.value);
    //       }}
    //     />
    //     <button
    //       className="input__submit input__submit--medium"
    //       type="submit"
    //       onClick={handleSubmit}
    //     >
    //       GO
    //     </button>
    //   </form>
    // </div>
  );
};

export default NewUserForm;
