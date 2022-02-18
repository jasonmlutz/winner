import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

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

      sessionStorage.setItem("sessionToken", user.session_token);

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let path;
      switch (urlParams.get("source")) {
        case "new-survey":
          path = "/surveys/new";
          break;
        default:
          path = `/users/${user.id}`;
          break;
      }
      navigate(path);
    } else {
      alert("please complete both fields");
    }
  }

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Login - Winner</title>
      </Helmet>{" "}
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
          className="absolute h-full w-full object-cover"
        />
        <div className="inset-0 bg-black opacity-50 absolute"></div>
        <div className="container mx-auto relative z-10 mt-20 w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5">
          <div className="flex flex-col content-center relative z-10">
            <div className="self-center mb-2 text-xl font-light text-gray-800 dark:text-white">
              Welcome back!
            </div>
            <span className="self-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
              Need to create an account?{" "}
              <a
                href=""
                className="text-sm text-blue-500 underline hover:text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                Register
              </a>
            </span>
            <div className="p-6 mt-8">
              <form action="#">
                <div className="flex flex-col mb-2">
                  <div className="relative ">
                    <input
                      type="text"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="relative ">
                    <input
                      type="password"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-full my-4">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewSessionForm;
