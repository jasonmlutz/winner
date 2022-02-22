import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NewUserForm = ({ source = "profile/" }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  if (!currentUser.id) {
    const validateFields = () => {
      var message = "";
      if (!name) {
        message += "Please select a name. ";
      }

      if (!password || !password_confirmation) {
        message += "Please complete both password fields. ";
      }
      if (password !== password_confirmation) {
        message += "Passwords must match. ";
      }
      if (password.length < 6) {
        message += "Password must be at least 6 characters long.";
      }

      if (message.length) {
        window.alert(message);
        return false;
      } else {
        return true;
      }
    };

    async function handleSubmit(e) {
      e.preventDefault();
      if (validateFields()) {
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
        navigate(source);
      }
    }

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
                Create a new account
              </div>
              <span className="self-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  className="text-sm text-blue-500 underline hover:text-white"
                  to="/login"
                >
                  Sign in
                </Link>
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

                  <div className="flex w-full my-4">
                    <button
                      type="submit"
                      className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default NewUserForm;
