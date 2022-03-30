import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewUserForm = ({ source = "/profile", setType, message }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [nameAvailable, setNameAvailable] = useState(false);
  const [renderLoadingIcon, setRenderLoadingIcon] = useState(false);
  const [renderNameStatus, setRenderNameStatus] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [renderPasswordStatus, setRenderPasswordStatus] = useState(false);

  const { setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  var timeout;

  useEffect(() => {
    if (name.length) {
      clearTimeout(timeout);
      setRenderLoadingIcon(true);
      setRenderNameStatus(false);
      timeout = setTimeout(() => {
        checkAvailability();
      }, 1000);
    } else {
      setRenderLoadingIcon(false);
      setRenderNameStatus(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [name]);

  useEffect(() => {
    if (password.length && password_confirmation.length) {
      setRenderPasswordStatus(true);
      setPasswordsMatch(password === password_confirmation);
    }
  }, [password, password_confirmation]);

  async function handleSubmit(e) {
    e.preventDefault();
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

    if (user.error) {
      window.alert(user.error);
      setPassword("");
      setPassword_confirmation("");
      return;
    }

    setCurrentUser(user);
    if ((source = "/profile")) {
      navigate("/profile?source=register");
    } else {
      navigate(source);
    }
  }

  async function checkAvailability() {
    if (name) {
      const response = await fetch(`/api/check_availability/${name}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        setRenderLoadingIcon(false);
        return;
      }

      const data = await response.json();
      if (data.name_available) {
        setNameAvailable(true);
      } else {
        setNameAvailable(false);
      }

      setRenderLoadingIcon(false);
      setRenderNameStatus(true);
    }
  }

  const loadingIcon = (
    <svg
      className="absolute inset-y-0 right-0 z-20 animate-spin m-[5px] h-8 w-8 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const nameStatus = () => {
    if (nameAvailable) {
      return (
        <div className="flex flex-col mb-2 mx-auto">
          <div
            className="bg-green-200 border-green-600 text-green-600 border-l-4 p-2 mx-2"
            role="alert"
          >
            <p>{name} is available!</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col mb-2 mx-auto">
          <div
            className="bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-4"
            role="alert"
          >
            <p>{name} is not available!</p>
          </div>
        </div>
      );
    }
  };

  const passwordStatus = () => {
    if (passwordsMatch) {
      return (
        <div className="flex flex-col mb-2 mx-auto">
          <div
            className="bg-green-200 border-green-600 text-green-600 border-l-4 p-2 mx-2"
            role="alert"
          >
            <p>Passwords match!</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col mb-2 mx-auto">
          <div
            className="bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-4"
            role="alert"
          >
            <p>Passwords do not match!</p>
          </div>
        </div>
      );
    }
  };

  const renderRegisterButton = () => {
    if (nameAvailable && passwordsMatch) {
      return (
        <button
          type="submit"
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          onClick={handleSubmit}
        >
          Register
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="py-2 px-4 bg-gray-600 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg cursor-not-allowed"
          onClick={(e) => e.preventDefault()}
          disabled
        >
          Register
        </button>
      );
    }
  };

  return (
    <>
      <Helmet helmetData={helmetData}>
        <title>Register - Winner</title>
      </Helmet>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img
          src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
          className="absolute h-full w-full object-cover"
        />
        <div className="inset-0 bg-black opacity-50 absolute"></div>
        <div className="container mx-auto relative z-10 mt-20 w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5">
          <div className="flex flex-col content-center relative z-10">
            <div className="self-center mb-2 text-xl font-light text-gray-800 dark:text-white">
              {message || "Create a new account"}
            </div>
            <span className="self-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
              Already have an account?{" "}
              <div
                className="cursor-pointer text-sm text-blue-500 underline hover:text-white"
                onClick={() => setType("login")}
              >
                Sign in
              </div>
            </span>
            <div className="p-6 mt-8">
              <form>
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
                    {renderLoadingIcon ? loadingIcon : null}
                  </div>
                </div>
                {renderNameStatus ? nameStatus() : null}
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
                <div className="flex flex-col mb-2">
                  <div className="relative ">
                    <input
                      type="password"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="Confirm Password"
                      value={password_confirmation}
                      onChange={(e) => {
                        setPassword_confirmation(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {renderPasswordStatus ? passwordStatus() : null}
                <div className="flex w-full my-4">{renderRegisterButton()}</div>
                <div className="flex w-full my-4">
                  <Link
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-auto mx-auto"
                    to="/surveys"
                  >
                    Browse surveys as guest
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUserForm;
