import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { CurrentUserContext } from "./contexts/CurrentUserContext";

const Header = ({ hideHeader = false }) => {
  const [userActionMenuVisible, setUserActionMenuVisible] = useState(false);
  const [navMenuVisible, setNavMenuVisible] = useState(false);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  var userActionMenuClasses =
    "absolute top-[50px] -right-2 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5";
  userActionMenuClasses += userActionMenuVisible ? " block" : " hidden";

  var navMenuClasses =
    "absolute left-2 top-[64px] mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5";
  navMenuClasses += navMenuVisible ? " block" : " hidden";

  var extraDarkBackground = userActionMenuVisible || navMenuVisible;
  var backgroundClasses = "inset-0 bg-black absolute";
  backgroundClasses += extraDarkBackground ? " z-10 opacity-75" : " opacity-50";

  var headerClasses =
    "absolute left-0 right-0 z-20 transition-[top] duration-300 ease-in-out ";
  headerClasses += hideHeader ? "-top-16" : "top-0";

  async function handleLogout() {
    const token = document.querySelector("[name=csrf-token]").content;

    await fetch(`/api/session`, {
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": token,
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setCurrentUser({});
    navigate("/login?source=logout");
  }

  return (
    <>
      <header className={headerClasses}>
        <nav className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <div className="-mr-2 flex md:hidden">
                  <button
                    type="button"
                    id="nav-menu"
                    className="text-white hover:text-gray-300 inline-flex items-center justify-center rounded-md hover:outline-none"
                    onClick={() => {
                      setNavMenuVisible(!navMenuVisible);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="h-8 w-8"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                    </svg>
                  </button>
                  <div
                    className={navMenuClasses}
                    onMouseLeave={() => {
                      setNavMenuVisible(false);
                    }}
                  >
                    <div
                      className="py-1 "
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-actions-menu"
                    >
                      <Link
                        to="/surveys"
                        className="block block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                      >
                        <span className="flex flex-col">
                          <span>All Surveys</span>
                        </span>
                      </Link>
                      {currentUser && currentUser.id ? (
                        <Link
                          to="/surveys/new"
                          className="block block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                        >
                          <span className="flex flex-col">
                            <span>Create a Survey</span>
                          </span>
                        </Link>
                      ) : null}
                      <Link
                        to="/users"
                        className="block block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                      >
                        <span className="flex flex-col">
                          <span>All Users</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-4">
                    <Link
                      to="/surveys"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                    >
                      All Surveys
                    </Link>
                    {currentUser && currentUser.id ? (
                      <Link
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                        to="/surveys/new"
                      >
                        Create a Survey
                      </Link>
                    ) : null}
                    <Link
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                      to="/users"
                    >
                      All Users
                    </Link>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="bg-gray-100 z-20 flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-300 hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-100 hover:ring-gray-500"
                          id="user-actions-menu"
                          onClick={() => {
                            setUserActionMenuVisible(!userActionMenuVisible);
                          }}
                        >
                          <svg
                            width="20"
                            fill="currentColor"
                            height="20"
                            className="text-gray-800"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                          </svg>
                        </button>
                      </div>
                      <div
                        className={userActionMenuClasses}
                        onMouseLeave={() => {
                          setUserActionMenuVisible(false);
                        }}
                      >
                        <div
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-actions-menu"
                        >
                          <Link
                            to="/profile"
                            className="block block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                          >
                            <span className="flex flex-col">
                              <span>
                                {currentUser && currentUser.id
                                  ? "My Profile"
                                  : "Register"}
                              </span>
                            </span>
                          </Link>
                          {currentUser && currentUser.id ? (
                            <div
                              className="cursor-pointer block block px-4 py-2 text-md text-gray-100 hover:text-white hover:bg-gray-600"
                              role="menuitem"
                              onClick={() => handleLogout()}
                            >
                              <span className="flex flex-col">
                                <span>Logout</span>
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className={backgroundClasses}></div>
    </>
  );
};

export default Header;
